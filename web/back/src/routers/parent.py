from __future__ import annotations

from fastapi import Depends, Path

import models
from models.user import UserModel
from src.dependencies import create_user_service


async def upsert_parent(
    parent: UserModel,
    user_service=Depends(create_user_service),
) -> UserModel:
    user_service.upsert_user(parent)
    user_service.link_role(user_id=parent.user_id, role=models.Roles.PARENT)
    return parent
    return parent


async def get_parent_by_tg_id(
    tg_id: str,
    user_service=Depends(create_user_service),
) -> UserModel | None:
    return user_service.get_by_tg_user_id(tg_id)


async def get_parents_by_child_id(
    child_id: str,
    user_service=Depends(create_user_service),
) -> list[UserModel]:
    parent_ids = user_service.get_parents_ids_by_child_id(child_id)
    result = []
    for parent_id in parent_ids:
        parent_model = user_service.get_by_user_id(parent_id)
        result.append(parent_model)
    return result


async def delete_parent(
    parent_id: str,
    user_service=Depends(create_user_service),
) -> None:
    return user_service.delete_by_id(user_id=parent_id)
