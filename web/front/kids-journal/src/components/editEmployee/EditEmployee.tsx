import React, { useEffect, useState } from "react";
import { Input, Select } from "@chakra-ui/react";
import { ButtonMain } from "../button/ButtonMain";
import "./EditEmployee.css";
import { InputPhone } from "../input-phone/InputPhone";
import { ApiRoute, AppRoute, testOrganization } from "../../const";
import { useParams } from "react-router-dom";

const options = [
  { label: "Садик №1", value: 1 },
  { label: "Садик Вишенка", value: 2 },
];

const optionsJob = [{ job: "Воспитатель", value: 1 }];

type addEmployeeProps = {
  organization: string | undefined;
};

const employeeInfo = {
  user_id: "",
  organization_id: "",
  name: "",
  phone_number: "",
};

export const EditEmployee = ({ organization }: addEmployeeProps) => {
  const { user_id } = useParams();

  const [valueName, setName] = useState("");
  const [valueSurname, setSurname] = useState("");
  const [valueJob, setValueJob] = useState("");
  const [valueTel, setValueTel] = useState("");

  const [employees, setEmployees] = useState(employeeInfo);

  useEffect(() => {
    fetch(`${ApiRoute}/employee/${user_id}`, {
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

  useEffect(() => {
    setName(employees.name.split(" ")[0]);
    setSurname(employees.name.split(" ")[0]);
    setValueTel(employees.phone_number);
  }, [employees]);

  const addEmployees = () => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    let employee = JSON.stringify({
      user_id: user_id,
      first_name: valueName,
      last_name: valueSurname,
      /*role_id: optionsJob[Number(valueJob) - 1].job,*/
      phone_number: valueTel,
    });

    let requestOptions1 = {
      method: "POST",
      headers: headers,
      body: employee,
    };

    fetch(
      ApiRoute + `/organizations/${testOrganization}/employee`,
      requestOptions1,
    );
  };

  return (
    <>
      <form className="creat-employees__container">
        <div className="creat__text">Добавление нового сотрудника</div>
        <div className="employees-creat__form">
          <div className="subject-creat">
            <div className="employees-creat__form-items">
              <Select
                placeholder="Выберите должность"
                onChange={(event: React.FormEvent<HTMLSelectElement>) =>
                  setValueJob(event.currentTarget.value)
                }
                style={{
                  background: "white",
                }}
              >
                {optionsJob.map((option) => (
                  <option value={option.value}>{option.job}</option>
                ))}
              </Select>
            </div>
            <div className="employees-creat__form-items">
              <Input
                type="text"
                placeholder="Введите имя"
                onChange={(event: React.FormEvent<HTMLInputElement>) =>
                  setName(event.currentTarget.value)
                }
                style={{
                  background: "white",
                }}
                variant="filled"
                value={valueName}
              />
            </div>
            <div className="employees-creat__form-items">
              <Input
                type="text"
                placeholder="Введите фамилию"
                onChange={(event: React.FormEvent<HTMLInputElement>) =>
                  setSurname(event.currentTarget.value)
                }
                style={{
                  background: "white",
                }}
                variant="filled"
                value={valueSurname}
              />
            </div>
            <div className="employees-creat__form-items">
              <InputPhone
                onChange={(event: React.FormEvent<HTMLInputElement>) =>
                  setValueTel(event.currentTarget.value)
                }
                variant="filled"
                value={valueTel}
              />
            </div>
            <div className="creat-employees__form-button">
              <ButtonMain
                className="creat__form-button"
                height="44px"
                width="211px"
                onClick={() => addEmployees()}
                linkButton={`/${organization}${AppRoute.Employees}`}
              >
                Добавить сотрудника
                <svg
                  width="18"
                  height="10"
                  viewBox="0 0 18 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.707 9L15.9999 5.70711C16.3905 5.31658 16.3905 4.68342 15.9999 4.29289L12.707 1M15.707 5L1.70703 5"
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
    </>
  );
};
