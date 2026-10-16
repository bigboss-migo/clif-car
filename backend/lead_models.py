import re
from typing import Annotated, Literal, Optional, Union

from pydantic import BaseModel, BeforeValidator, ConfigDict, EmailStr, Field, StrictBool, field_validator

MAX_STR = 200
MAX_NOTES = 2000
_CTRL = re.compile(r"[\x00-\x1f\x7f-\x9f]")
_CTRL_KEEP_LINES = re.compile(r"[\x00-\x08\x0b-\x1f\x7f-\x9f]")  # keeps \t and \n


def _to_str(v):
    if isinstance(v, (int, float)) and not isinstance(v, bool):
        return str(v)
    return v


def _check_len(v: str, limit: int) -> str:
    if len(v) > limit:
        raise ValueError(f"must be at most {limit} characters")
    return v


def _clean(v):
    v = _to_str(v)
    return _check_len(_CTRL.sub("", v).strip(), MAX_STR) if isinstance(v, str) else v


def _clean_notes(v):
    v = _to_str(v)
    return _check_len(_CTRL_KEEP_LINES.sub("", v).strip(), MAX_NOTES) if isinstance(v, str) else v


def _clean_header(v):
    v = _to_str(v)
    if isinstance(v, str) and ("\n" in v or "\r" in v):
        raise ValueError("must not contain line breaks")
    return _clean(v)


Str = Annotated[str, BeforeValidator(_clean)]
HeaderStr = Annotated[str, BeforeValidator(_clean_header)]
NotesStr = Annotated[str, BeforeValidator(_clean_notes)]
Email = Annotated[EmailStr, BeforeValidator(_clean_header)]
Required = Field(min_length=1)


class _Base(BaseModel):
    model_config = ConfigDict(extra="ignore")

    consent: StrictBool
    source: Optional[Str] = None
    website: Optional[str] = None

    @field_validator("consent")
    @classmethod
    def _consent_true(cls, v: bool) -> bool:
        if v is not True:
            raise ValueError("consent must be true")
        return v


class LeadPayload(_Base):
    type: Literal["lead"]
    firstName: HeaderStr = Required
    lastName: HeaderStr = Required
    email: Email
    countryIso: Optional[Str] = None
    countryCode: Optional[Str] = None
    phone: Str
    city: Optional[Str] = None
    state: Optional[Str] = None
    contactPreference: Optional[Str] = None
    newsletterOptIn: Optional[bool] = None
    vehicleYear: Optional[HeaderStr] = None
    vehicleMake: Optional[HeaderStr] = None
    vehicleModel: Optional[HeaderStr] = None
    vehicleColor: Optional[Str] = None
    acquisition: Optional[Str] = None
    budget: Optional[Str] = None
    downPayment: Optional[Str] = None
    creditRange: Optional[Str] = None
    timeline: Optional[Str] = None
    tradeIn: Optional[Union[bool, Str]] = None
    heardAbout: Optional[Str] = None
    referralName: Optional[Str] = None
    notes: Optional[NotesStr] = None
    quotedPayment: Optional[Str] = None
    utm_source: Optional[Str] = None
    utm_medium: Optional[Str] = None
    utm_campaign: Optional[Str] = None

    @field_validator("phone")
    @classmethod
    def _phone_digits(cls, v: str) -> str:
        digits = re.sub(r"[\s().\-+]", "", v)
        if not digits.isdigit() or not 7 <= len(digits) <= 15:
            raise ValueError("must be 7-15 digits")
        return digits

    @field_validator("countryCode")
    @classmethod
    def _country_code(cls, v: Optional[str]) -> Optional[str]:
        if v and not re.fullmatch(r"\+?\d{1,4}", v):
            raise ValueError("must be a numeric dialing code")
        return v


class NewsletterPayload(_Base):
    type: Literal["newsletter"]
    firstName: Optional[Str] = None
    email: Email
    state: Optional[Str] = None
    favoriteMake: Optional[Str] = None


Payload = Annotated[Union[LeadPayload, NewsletterPayload], Field(discriminator="type")]
