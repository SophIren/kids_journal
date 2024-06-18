import React, { useEffect, useState } from "react";
import {
  AppRoute,
  ApiRoute,
  infoGroups,
  testOrganization,
  skill_level_id_no,
  skill_level_id_yes,
} from "../../const";
import { ButtonMain } from "../button/ButtonMain";
import "./ProgressList.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Checkbox } from "@chakra-ui/react";
import { child } from "../groupInfo/GroupInfo";

export type ProgressListProps = {
  organization: string | undefined;
  group: string | undefined;
  lesson: string | undefined;
};

export const groupInfo = [
  {
    group_id: "",
    organization_id: "",
    name: "",
    age_range: "",
  },
];

type checkboxChildren = {
  [file: string]: boolean;
};

export const ProgressList = ({
  organization,
  group,
  lesson,
}: ProgressListProps) => {

  const [isEditMode, setIsEditMode] = useState(true);
  const [children, setChildren] = useState([child]);
  const [check, setCheck] = useState<checkboxChildren>({});

  useEffect(() => {
    fetch(`${ApiRoute}/${group}/child`, {
      method: "GET",
      headers: { Accept: "application/json" },
    })
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          return response;
        }
        throw new Error();
      })
      .then((response) => response.json())
      .then((data) => {
        setChildren(data);
      });
  }, []);

  const handleCheckbox = (
    event: React.ChangeEvent<HTMLInputElement>,
    child_id: string,
  ) => {
    setCheck({ ...check, [child_id]: event.currentTarget.checked });
  };

  const handleGrade = () => {
    if (isEditMode) {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");

      let subject = JSON.stringify({});

      let requestOptions = {
        method: "POST",
        headers: headers,
        body: subject,
      };

      children.forEach((child) => {
        const isChecked = check[child.child_id];
        console.log(isChecked, child.child_id, lesson);
        if (isChecked === undefined) {
          fetch(
            ApiRoute +
              `/children/${child.child_id}/skills/${lesson}/?skill_level_id=${skill_level_id_no}`,
            requestOptions,
          );
        } else {
          fetch(
            ApiRoute +
              `/children/${child.child_id}/skills/${lesson}/?skill_level_id=${
                isChecked ? skill_level_id_yes : skill_level_id_no
              }`,
            requestOptions,
          );
        }
      });
    }
    setIsEditMode(!isEditMode);
  };

  return (
    <>
      <div className="progress__container">
        <div className="progress_title">Оценка прогресса</div>
        <div>
          <ButtonMain
            height="40px"
            width="200px"
            onClick={handleGrade}
            linkButton={``}
          >
            {isEditMode ? (
              "Сохранить изменения"
            ) : (
              <>
                Редактировать{" "}
                <svg
                  width="18"
                  height="10"
                  viewBox="0 0 18 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.7073 9L16.0002 5.70711C16.3907 5.31658 16.3907 4.68342 16.0002 4.29289L12.7073 1M15.7073 5L1.70728 5"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                </svg>
              </>
            )}
          </ButtonMain>
        </div>
      </div>

      <div className="progress">
        <table className="progress__table">
          <thead className="progress-title">
            <tr>
              <td className="progress-title_label">Имя</td>
              <td className="progress-title_age">Возраст</td>
              <td className="progress-title_grade">Прошёл(ла) тему?</td>
            </tr>
          </thead>
          <tbody>
            {children.map((child, index) => (
              <tr className="progress-item">
                <td className="progress-item_label">
                  <Link to={`/${organization}/${child.first_name}`}>
                    {child.first_name}
                  </Link>
                </td>
                <td className="progress-item_age">
                  {new Date().getFullYear() -
                    new Date(child.birth_date).getFullYear()}
                </td>
                <td className="progress-item_grade">
                  <Checkbox
                    isDisabled={!isEditMode}
                    size="lg"
                    className="progress-item_grade-check"
                    colorScheme="green"
                    onChange={(event) => handleCheckbox(event, child.child_id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
