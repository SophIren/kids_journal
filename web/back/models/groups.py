from uuid import UUID, uuid4

from pydantic import BaseModel

from models.entity import AgeRanges


class GroupModel(BaseModel):
    group_id: UUID = uuid4()
    organization_id: UUID = uuid4()
    name: str
    age_range: AgeRanges


class GroupChildModel(BaseModel):
    group_id: UUID = uuid4()
    child_ids: list[UUID] = []