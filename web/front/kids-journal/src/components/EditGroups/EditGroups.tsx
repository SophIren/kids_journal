import "./EditGroups.css";
import React, { ChangeEventHandler, useEffect, useState } from "react";
import { Input, Select } from "@chakra-ui/react";
import { ButtonMain } from "../button/ButtonMain";
import { ApiRoute, AppRoute, hoho, testOrganization } from "../../const";
import { employeeInfo } from "../employees/Employees";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import { postAllData, postGroup } from "../../features/groupsSlice";
import { useParams } from "react-router-dom";
import { GROUP } from "../../types/group";

const optionsAge = [
  { age: "0-3", value: 1 },
  { age: "3-6", value: 2 },
  { age: "6-9", value: 3 },
];

type CreateGroupsProps = {
  organization: string | undefined;
};

export const EditGroups = ({ organization }: CreateGroupsProps) => {
  const { group_id } = useParams();

  const [valueTeach, setValueTeach] = useState("");
  const [valueName, setNameInput] = useState("");
  const [valueAge, setValueAge] = useState("");

  const [editGroup, setEditGroup] = useState(GROUP);
  const [employees, setEmployees] = useState(employeeInfo);

  useEffect(() => {
    console.log("group_id", group_id);
    fetch(`${ApiRoute}/groups/${group_id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          return response;
        }
        throw new Error();
      })
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        setEditGroup(data);
      });
  }, []);

  useEffect(() => {
    setNameInput(editGroup.name);
    setValueAge(editGroup.age_range);
  }, [editGroup]);

  console.log(valueName, valueAge);

  useEffect(() => {
    fetch(`${ApiRoute}/organizations/${testOrganization}/employee`, {
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
        setEmployees(data);
      });
  }, []);

  const createGroup = () => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const value = {
      group_id: group_id,
      organization_id: testOrganization,
      age_range: valueAge,
      name: valueName,
    };

    const body = JSON.stringify(value);

    const requestOptions = {
      method: "POST",
      headers: headers,
      body: body,
    };

    fetch(ApiRoute + "/groups", requestOptions);

    fetch(ApiRoute + ``);
    console.log(employees[Number(valueTeach)]);
  };

  return (
    <form className="create-group-main__container">
      <div className="create-group__text">Общая информация</div>
      <div className="create-group__form">
        <div className="create-group">
          <div className="create-group__form-items">
            <div className="create-group__form-items_name">
              Выберите возраст детей
            </div>
            <div>
              <Select
                placeholder="Выберите возраст детей"
                onChange={(event: React.FormEvent<HTMLSelectElement>) =>
                  setValueAge(event.currentTarget.value)
                }
                style={{
                  background: "white",
                }}
                variant="filled"
                value={valueAge}
              >
                {optionsAge.map((option) => (
                  <option value={option.age}>{option.age}</option>
                ))}
              </Select>
            </div>
          </div>
          <div className="create-group__form-items">
            <div className="create-group__form-items_name">
              Введите название группы
            </div>
            <div>
              <Input
                type="text"
                placeholder="Введите название группы"
                onChange={(event: React.FormEvent<HTMLInputElement>) =>
                  setNameInput(event.currentTarget.value)
                }
                style={{
                  background: "white",
                }}
                variant="filled"
                value={valueName}
              />
            </div>
          </div>
          <div className="create-group__form-items">
            <div className="create-group__form-items_name">
              Выберите преподавателя
            </div>
            <div>
              <Select
                placeholder="Выберите преподавателя"
                onChange={(event: React.FormEvent<HTMLSelectElement>) =>
                  setValueTeach(event.currentTarget.value)
                }
                style={{
                  background: "white",
                }}
              >
                {employees?.map((employee, index) => (
                  <option value={employee.name}>{employee.name}</option>
                ))}
              </Select>
            </div>
          </div>
          <div className="create-group__form-button">
            <ButtonMain
              className="create-group__button"
              height="40px"
              width="160px"
              linkButton={`/${organization}/${valueName}${AppRoute.AddChild}`}
              onClick={() => createGroup()}
            >
              Продолжить
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
            </ButtonMain>
          </div>
        </div>
      </div>
    </form>
  );
};
