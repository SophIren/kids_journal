from __future__ import annotations

from fastapi import Depends
from fastapi.params import Path

from db.services.groups import GroupModel, GroupService
from db.services.user import UserService
from models.child import ChildModelResponse
from models.user import UserModel
from src.dependencies import create_group_service, create_user_service


async def add_group_to_organization(
    group: GroupModel,
    group_service: GroupService = Depends(create_group_service),
) -> GroupModel:
    group_service.create_group(group)
    return group


async def get_groups_by_organization(
    organization_id: str = Path(...),
    group_service: GroupService = Depends(create_group_service),
) -> list[GroupModel]:
    return group_service.get_all_for_organization(organization_id)


async def get_group(
    group_id: str,
    group_service: GroupService = Depends(create_group_service),
) -> GroupModel | None:
    response = group_service.get_by_id(group_id)
    if not response:
        return None
    return response


# async def add_children_to_group(
#     group_child_model: GroupChildModel,
#     group_service: GroupService = Depends(create_group_service),
# ) -> None:
#     return group_service.link_to_children(group_child_model)


async def get_children_by_group_id(
    group_id: str,
    group_service: GroupService = Depends(create_group_service)
) -> list[ChildModelResponse]:
    return group_service.get_children_by_group_id(group_id)


async def delete_group(
    group_id: str, group_service: GroupService = Depends(create_group_service)
) -> None:
    return group_service.delete_by_id(group_id=group_id)


async def get_employees_for_group(
    group_id: str,
    group_service: GroupService = Depends(create_group_service),
    user_service: UserService = Depends(create_user_service)
) -> list[UserModel]:
    teacher_ids = group_service.get_employee_ids_by_group_id(group_id)
    teacher_models = []
    for teacher_id in teacher_ids:
        teacher = user_service.get_by_id(teacher_id)
        teacher_models.append(teacher)
    return teacher_models
