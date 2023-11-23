import argparse
import logging
import os
import posixpath

import ydb


def create_tables(session_pool, path):
    def callee(session):
        # organization
        session.create_table(
            os.path.join(path, "organization"),
            ydb.TableDescription()
            .with_primary_keys("organization_id")
            .with_columns(
                ydb.Column("organization_id", ydb.PrimitiveType.Uint64),
                ydb.Column("description", ydb.OptionalType(ydb.PrimitiveType.Utf8)),
                ydb.Column("photo_url", ydb.OptionalType(ydb.PrimitiveType.Utf8)),
                ydb.Column("start_education_time", ydb.OptionalType(ydb.PrimitiveType.Timestamp)),
                ydb.Column("end_education_time", ydb.OptionalType(ydb.PrimitiveType.Timestamp)),
                ydb.Column("registration_date", ydb.OptionalType(ydb.PrimitiveType.Date)),
                ydb.Column("uploaded_date", ydb.OptionalType(ydb.PrimitiveType.Date)),
            )
        )

        # group
        session.create_table(
            os.path.join(path, "group"),
            ydb.TableDescription()
            .with_primary_keys("group_id")
            .with_columns(
                ydb.Column("group_id", ydb.PrimitiveType.Uint64),
                ydb.Column("organization_id", ydb.OptionalType(ydb.PrimitiveType.Uint64)),
                ydb.Column("name", ydb.OptionalType(ydb.PrimitiveType.Utf8)),
                ydb.Column("age_range", ydb.OptionalType(ydb.PrimitiveType.Uint64)),
            ).with_indexes(
                ydb.TableIndex("organization_index").with_index_columns("organization_id")
            )
        )

        # group_teacher
        session.create_table(
            os.path.join(path, "group_teacher"),
            ydb.TableDescription()
            .with_primary_keys("group_id", "teacher_id")
            .with_columns(
                ydb.Column("group_id", ydb.PrimitiveType.Uint64),
                ydb.Column("teacher_id", ydb.PrimitiveType.Uint64),
            )
        )

        # group_child
        session.create_table(
            os.path.join(path, "group_child"),
            ydb.TableDescription()
            .with_primary_keys("group_id", "child_id")
            .with_columns(
                ydb.Column("group_id", ydb.PrimitiveType.Uint64),
                ydb.Column("child_id", ydb.PrimitiveType.Uint64),
            )
        )

        # group_subject
        session.create_table(
            os.path.join(path, "group_subject"),
            ydb.TableDescription()
            .with_primary_keys("group_id", "subject_id")
            .with_columns(
                ydb.Column("group_id", ydb.PrimitiveType.Uint64),
                ydb.Column("subject_id", ydb.PrimitiveType.Uint64),
            )
        )

        # child
        session.create_table(
            os.path.join(path, "child"),
            ydb.TableDescription()
            .with_primary_keys("child_id")
            .with_columns(
                ydb.Column("child_id", ydb.PrimitiveType.Uint64),
                ydb.Column("name", ydb.OptionalType(ydb.PrimitiveType.Utf8)),
                ydb.Column("first_name", ydb.OptionalType(ydb.PrimitiveType.Utf8)),
                ydb.Column("birth_date", ydb.OptionalType(ydb.PrimitiveType.Date)),
                ydb.Column("start_education_date", ydb.OptionalType(ydb.PrimitiveType.Date)),
                ydb.Column("start_education_time", ydb.OptionalType(ydb.PrimitiveType.Timestamp)),
                ydb.Column("end_education_time", ydb.OptionalType(ydb.PrimitiveType.Timestamp)),
                ydb.Column("gender", ydb.OptionalType(ydb.PrimitiveType.Uint8)),
                ydb.Column("parent_1", ydb.OptionalType(ydb.PrimitiveType.Uint8)),
                ydb.Column("parent_2", ydb.OptionalType(ydb.PrimitiveType.Uint8)),
            )
        )

        # child_skills
        session.create_table(
            os.path.join(path, "child_skills"),
            ydb.TableDescription()
            .with_primary_keys("child_id", "skill_id")
            .with_columns(
                ydb.Column("child_id", ydb.PrimitiveType.Uint64),
                ydb.Column("skill_id", ydb.PrimitiveType.Uint64),
                ydb.Column("success_level_id", ydb.OptionalType(ydb.PrimitiveType.Uint64)),
            )
            .with_indexes(ydb.TableIndex("success_level_index").with_index_columns("success_level_id"))
        )

        # subject_presentation
        session.create_table(
            os.path.join(path, "subject_presentation"),
            ydb.TableDescription()
            .with_primary_keys("subject_id", "presentation_id")
            .with_columns(
                ydb.Column("subject_id", ydb.PrimitiveType.Uint64),
                ydb.Column("presentation_id", ydb.PrimitiveType.Uint64),
            )
        )

        # employee
        session.create_table(
            os.path.join(path, "employee"),
            ydb.TableDescription()
            .with_primary_keys("employee_id")
            .with_columns(
                ydb.Column("employee_id", ydb.PrimitiveType.Uint64),
                ydb.Column("name", ydb.OptionalType(ydb.PrimitiveType.Utf8)),
                ydb.Column("first_name", ydb.OptionalType(ydb.PrimitiveType.Utf8)),
                ydb.Column("last_name", ydb.OptionalType(ydb.PrimitiveType.Utf8)),
                ydb.Column("email", ydb.OptionalType(ydb.PrimitiveType.Utf8)),
                ydb.Column("gender", ydb.OptionalType(ydb.PrimitiveType.Uint8)),
                ydb.Column("phone_number", ydb.OptionalType(ydb.PrimitiveType.Utf8)),
                ydb.Column("avatar_url", ydb.OptionalType(ydb.PrimitiveType.Utf8)),
                ydb.Column("tg_user_id", ydb.OptionalType(ydb.PrimitiveType.Uint64)),
                ydb.Column("role_id", ydb.OptionalType(ydb.PrimitiveType.Uint64)),
            )
            .with_indexes(
                ydb.TableIndex("tg_user_index").with_index_columns("tg_user_id"),
                ydb.TableIndex("role_index").with_index_columns("role_id")
            ),
        )

        # parent
        session.create_table(
            os.path.join(path, "parent"),
            ydb.TableDescription()
            .with_primary_keys("parent_id")
            .with_columns(
                ydb.Column("parent_id", ydb.PrimitiveType.Uint64),
                ydb.Column("name", ydb.OptionalType(ydb.PrimitiveType.Utf8)),
                ydb.Column("first_name", ydb.OptionalType(ydb.PrimitiveType.Utf8)),
                ydb.Column("last_name", ydb.OptionalType(ydb.PrimitiveType.Utf8)),
                ydb.Column("email", ydb.OptionalType(ydb.PrimitiveType.Utf8)),
                ydb.Column("gender", ydb.OptionalType(ydb.PrimitiveType.Uint8)),
                ydb.Column("phone_number", ydb.OptionalType(ydb.PrimitiveType.Utf8)),
                ydb.Column("freq_notifications", ydb.OptionalType(ydb.PrimitiveType.Uint64)),
                ydb.Column("tg_user_id", ydb.OptionalType(ydb.PrimitiveType.Uint64)),
            )
            .with_indexes(
                ydb.TableIndex("tg_user_index").with_index_columns("tg_user_id"),
            ),
        )

        # skill_level
        session.create_table(
            os.path.join(path, "skill_level"),
            ydb.TableDescription()
            .with_primary_keys("skill_level_id")
            .with_columns(
                ydb.Column("skill_level_id", ydb.PrimitiveType.Uint64),
                ydb.Column("name", ydb.OptionalType(ydb.PrimitiveType.Utf8)),
            )
        )

        # skill
        session.create_table(
            os.path.join(path, "skill"),
            ydb.TableDescription()
            .with_primary_keys("skill_id")
            .with_columns(
                ydb.Column("skill_id", ydb.PrimitiveType.Uint64),
                ydb.Column("name", ydb.OptionalType(ydb.PrimitiveType.Utf8)),
            )
        )

        # presentation
        session.create_table(
            os.path.join(path, "presentation"),
            ydb.TableDescription()
            .with_primary_keys("presentation_id")
            .with_columns(
                ydb.Column("presentation_id", ydb.PrimitiveType.Uint64),
                ydb.Column("name", ydb.OptionalType(ydb.PrimitiveType.Utf8)),
                ydb.Column("file_url", ydb.OptionalType(ydb.PrimitiveType.Utf8)),
                ydb.Column("photo_url", ydb.OptionalType(ydb.PrimitiveType.Utf8)),
                ydb.Column("description", ydb.OptionalType(ydb.PrimitiveType.Utf8)),
            )
        )

        # roles
        session.create_table(
            os.path.join(path, "role"),
            ydb.TableDescription()
            .with_primary_keys("role_id")
            .with_columns(
                ydb.Column("role_id", ydb.PrimitiveType.Uint64),
                ydb.Column("name", ydb.OptionalType(ydb.PrimitiveType.Utf8)),
            )
        )

        # tg_user???

    session_pool.retry_operation_sync(callee)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        formatter_class=argparse.RawDescriptionHelpFormatter,
        description="""create tables script""",
    )
    parser.add_argument("-d", "--database", required=True, help="Name of the database to use")
    parser.add_argument("-e", "--endpoint", required=True, help="Endpoint url to use")
    parser.add_argument("-p", "--path", default="")
    parser.add_argument("-v", "--verbose", default=False, action="store_true")

    args = parser.parse_args()

    if args.verbose:
        logger = logging.getLogger("ydb.pool.Discovery")
        logger.setLevel(logging.INFO)
        logger.addHandler(logging.StreamHandler())

    with ydb.Driver(
            endpoint=args.endpoint,
            database=args.database,
            credentials=ydb.credentials_from_env_variables()
    ) as driver:
        driver.wait(timeout=5, fail_fast=True)
        with ydb.SessionPool(driver) as pool:
            full_path = posixpath.join(args.database, args.path)
            create_tables(pool, full_path)
