import { useMultistepForm } from "../../utils/helpers/form/useMultistepForm";
import { UserForm } from "../../components/userForm/UserForm";
import { DescriptionForm } from "../../components/userForm/DescriptionForm";
import React, { FormEvent, useState } from "react";
import { Header } from "../../components/header/Header";
import "./CreateActivityPage.css";
import { ApiRoute, AppRoute } from "../../const";
import { useNavigate, useParams } from "react-router-dom";

type FormData = {
  group: string;
  isIndividual: boolean;
  listChildren: [];
  date: string;
  subject: string;
  topic: string;
  description: string;
};

const INITIAL_DATA: FormData = {
  group: "",
  subject: "",
  topic: "",
  date: "",
  listChildren: [],
  description: "",
  isIndividual: false,
};

export default function CreateActivityPage() {
  const { organization } = useParams();
  const [data, setData] = useState(INITIAL_DATA);
  console.log("data", data);
  function updateFields(fields: Partial<FormData>) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }

  const { steps, currentStepIndex, step, isFirstStep, back, next, isLastStep } =
    useMultistepForm([
      <UserForm {...data} updateFields={updateFields} />,
      <DescriptionForm {...data} updateFields={updateFields} />,
    ]);

  const navigate = useNavigate();

  function onSubmitForm(e: FormEvent) {
    e.preventDefault();
    if (!isLastStep) return next();
    else {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");

      let lesson = JSON.stringify({
        schedule: {
          presentation_id: data.topic,
          start_lesson: data.date,
        },
        child_ids: data.listChildren.map(
          (child: { name: string; id: string }) => child.name,
        ),
      });

      let requestOptions = {
        method: "POST",
        headers: headers,
        body: lesson,
      };

      console.log("lesson", lesson);

      fetch(ApiRoute + `/lessons?group_id=${data.group}`, requestOptions);
    }
    navigate(`/${organization}${AppRoute.Main}`);
  }

  return (
    <>
      <Header />
      <div className="creat__text">Создание новой активности</div>
      <div className="creat_activity_container">
        <form onSubmit={onSubmitForm}>
          <div style={{ position: "absolute", top: ".5rem", right: ".5rem" }}>
            {currentStepIndex + 1}/{steps.length}
          </div>
          {step}
          <div
            style={{
              marginTop: "1rem",
              display: "flex",
              gap: ".5rem",
              justifyContent: "flex-end",
            }}
          >
            {!isFirstStep && (
              <button
                className="creat-button-activity"
                type="button"
                onClick={back}
              >
                Назад
              </button>
            )}
            <button className="creat-button-activity" type="submit">
              {isLastStep ? "Сохранить" : "Дальше"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
