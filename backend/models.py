"""
Database Models for My Inbox Media Website
"""
from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, EmailStr, Field
from bson import ObjectId


def serialize_doc(doc: dict) -> dict:
    """Helper to serialize MongoDB documents"""
    if doc is None:
        return None
    
    # Handle _id
    if "_id" in doc and isinstance(doc["_id"], ObjectId):
        doc["id"] = str(doc["_id"])
        del doc["_id"]
    
    # Handle datetime fields
    for key, value in doc.items():
        if isinstance(value, datetime):
            doc[key] = value.isoformat()
        elif isinstance(value, ObjectId):
            doc[key] = str(value)
    
    return doc


# ============= ADMIN USER =============
class AdminUser(BaseModel):
    email: EmailStr
    name: str
    role: str = "admin"
    created_at: datetime = Field(default_factory=datetime.utcnow)


class AdminUserCreate(BaseModel):
    email: EmailStr
    name: str
    password: str


# ============= BLOG POST =============
class BlogPost(BaseModel):
    title: str = Field(..., min_length=5, max_length=200)
    slug: str
    excerpt: str = Field(..., max_length=500)
    content: str = Field(..., min_length=50)
    author: str
    featured_image: Optional[str] = None
    category: str
    tags: List[str] = []
    published: bool = False
    views: int = 0
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)


class BlogPostCreate(BaseModel):
    title: str = Field(..., min_length=5, max_length=200)
    excerpt: str = Field(..., max_length=500)
    content: str = Field(..., min_length=50)
    author: str
    featured_image: Optional[str] = None
    category: str
    tags: List[str] = []
    published: bool = False


class BlogPostUpdate(BaseModel):
    title: Optional[str] = None
    excerpt: Optional[str] = None
    content: Optional[str] = None
    featured_image: Optional[str] = None
    category: Optional[str] = None
    tags: Optional[List[str]] = None
    published: Optional[bool] = None


# ============= TESTIMONIAL =============
class Testimonial(BaseModel):
    client_name: str = Field(..., min_length=2, max_length=100)
    client_position: str = Field(..., max_length=100)
    client_company: str = Field(..., max_length=100)
    client_image: Optional[str] = None
    testimonial_text: str = Field(..., min_length=20, max_length=1000)
    rating: int = Field(..., ge=1, le=5)
    featured: bool = False
    published: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)


class TestimonialCreate(BaseModel):
    client_name: str = Field(..., min_length=2, max_length=100)
    client_position: str = Field(..., max_length=100)
    client_company: str = Field(..., max_length=100)
    client_image: Optional[str] = None
    testimonial_text: str = Field(..., min_length=20, max_length=1000)
    rating: int = Field(..., ge=1, le=5)
    featured: bool = False
    published: bool = True


class TestimonialUpdate(BaseModel):
    client_name: Optional[str] = None
    client_position: Optional[str] = None
    client_company: Optional[str] = None
    client_image: Optional[str] = None
    testimonial_text: Optional[str] = None
    rating: Optional[int] = None
    featured: Optional[bool] = None
    published: Optional[bool] = None


# ============= CASE STUDY =============
class CaseStudy(BaseModel):
    title: str = Field(..., min_length=5, max_length=200)
    slug: str
    client_name: str
    client_logo: Optional[str] = None
    industry: str
    challenge: str = Field(..., min_length=50)
    solution: str = Field(..., min_length=50)
    results: str = Field(..., min_length=50)
    technologies: List[str] = []
    featured_image: Optional[str] = None
    gallery_images: List[str] = []
    published: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)


class CaseStudyCreate(BaseModel):
    title: str = Field(..., min_length=5, max_length=200)
    client_name: str
    client_logo: Optional[str] = None
    industry: str
    challenge: str = Field(..., min_length=50)
    solution: str = Field(..., min_length=50)
    results: str = Field(..., min_length=50)
    technologies: List[str] = []
    featured_image: Optional[str] = None
    gallery_images: List[str] = []
    published: bool = False


class CaseStudyUpdate(BaseModel):
    title: Optional[str] = None
    client_name: Optional[str] = None
    client_logo: Optional[str] = None
    industry: Optional[str] = None
    challenge: Optional[str] = None
    solution: Optional[str] = None
    results: Optional[str] = None
    technologies: Optional[List[str]] = None
    featured_image: Optional[str] = None
    gallery_images: Optional[List[str]] = None
    published: Optional[bool] = None


# ============= CONTACT MESSAGE =============
class ContactMessage(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: Optional[str] = None
    service: Optional[str] = None
    message: str = Field(..., min_length=10, max_length=1000)
    status: str = "new"  # new, read, responded
    submitted_at: datetime = Field(default_factory=datetime.utcnow)
    email_sent: bool = False
