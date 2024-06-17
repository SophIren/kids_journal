from __future__ import annotations

from typing import Any

import ydb

from db.utils import _format_unix_time, _format_date_time, _format_date_time_to_date, _convert_ydb_date_to_pydantic
from models.child import ChildModelResponse, ChildModel
from models.group import GroupModel
from models.user import UserModelResponse


class GroupService:
    def __init__(self, ydb_pool: ydb.SessionPool, db_prefix: str):
        self._pool = ydb_pool
        self._db_prefix = db_prefix

    def create_group(self, args_model: GroupModel):
        args = args_model.model_dump(exclude_none=False, mode="json")

        def callee(session: ydb.Session):
            session.transaction().execute(
                """
                PRAGMA TablePathPrefix("{db_prefix}");
                UPSERT INTO group ({keys}) VALUES
                    (
                        "{group_id}",
                        "{organization_id}",
                        "{name}",
                        "{age_range}"
                    );
                """.format(
                    db_prefix=self._db_prefix,
                    keys=", ".join(args.keys()),
                    **args,
                ),
                commit_tx=True,
            )

        return self._pool.retry_operation_sync(callee)

    def get_all(self) -> list[GroupModel]:
        def callee(session: ydb.Session):
            return session.transaction().execute(
                """
                PRAGMA TablePathPrefix("{db_prefix}");
                SELECT *
                FROM group
                """.format(
                    db_prefix=self._db_prefix
                ),
                commit_tx=True,
            )

        results = self._pool.retry_operation_sync(callee)[0].rows
        return [GroupModel.model_validate(result) for result in results]

    def get_all_for_organization(self, organization_id: str) -> list[GroupModel]:
        def callee(session: ydb.Session):
            return session.transaction().execute(
                """
                PRAGMA TablePathPrefix("{db_prefix}");
                SELECT *
                FROM group
                WHERE organization_id = "{organization_id}"
                """.format(
                    db_prefix=self._db_prefix, organization_id=organization_id
                ),
                commit_tx=True,
            )

        results = self._pool.retry_operation_sync(callee)[0].rows
        return [GroupModel.model_validate(result) for result in results]

    def get_by_id(self, group_id: str) -> GroupModel | None:
        def callee(session: ydb.Session):
            return session.transaction().execute(
                """
                PRAGMA TablePathPrefix("{db_prefix}");
                SELECT *
                FROM group
                WHERE group_id = "{group_id}"
                """.format(
                    db_prefix=self._db_prefix, group_id=group_id
                ),
                commit_tx=True,
            )

        rows = self._pool.retry_operation_sync(callee)[0].rows
        if not rows:
            return None
        return GroupModel.model_validate(rows[0])

    def delete_by_id(self, group_id: str) -> None:
        def callee(session: ydb.Session):
            return session.transaction().execute(
                """
                PRAGMA TablePathPrefix("{db_prefix}");
                delete
                FROM group
                WHERE group_id = "{group_id}"
                """.format(
                    db_prefix=self._db_prefix, group_id=group_id
                ),
                commit_tx=True,
            )

        self._pool.retry_operation_sync(callee)

    def get_children_ids_by_group_id(self, group_id: str) -> list[str]:
        def callee(session: ydb.Session):
            return session.transaction().execute(
                """
                PRAGMA TablePathPrefix("{db_prefix}");
                SELECT *
                FROM group_child
                WHERE group_id = "{group_id}"
                """.format(
                    db_prefix=self._db_prefix,
                    group_id=group_id,
                ),
                commit_tx=True,
            )

        rows = self._pool.retry_operation_sync(callee)[0].rows
        return [row["child_id"] for row in rows]

    def get_children_by_group_id(self, group_id: str) -> list[ChildModelResponse]:
        def callee(session: ydb.Session):
            return session.transaction().execute(
                """
                PRAGMA TablePathPrefix("{db_prefix}");
                SELECT c.child_id, c.first_name, c.last_name, c.birth_date
                FROM child as c
                JOIN group_child AS gc on c.child_id = gc.child_id
                WHERE gc.group_id = "{group_id}"
                """.format(
                    db_prefix=self._db_prefix,
                    group_id=group_id,
                ),
                commit_tx=True,
            )

        rows = self._pool.retry_operation_sync(callee)[0].rows
        if not rows:
            return []
        result = []
        for row in rows:
            result.append(
                ChildModelResponse(
                    child_id=row["c.child_id"],
                    name=f'{row["c.first_name"]} {row["c.last_name"]}',
                    birth_date=_convert_ydb_date_to_pydantic(row["c.birth_date"]),
                )
            )

        return result

    def get_employee_ids_by_group_id(self, group_id: str) -> list[str]:
        def callee(session: ydb.Session):
            return session.transaction().execute(
                """
                PRAGMA TablePathPrefix("{db_prefix}");
                SELECT teacher_id
                FROM group_teacher
                WHERE group_id = "{group_id}"
                """.format(
                    db_prefix=self._db_prefix,
                    group_id=group_id
                ),
                commit_tx=True,
            )

        rows = self._pool.retry_operation_sync(callee)[0].rows
        return [row["teacher_id"] for row in rows]
