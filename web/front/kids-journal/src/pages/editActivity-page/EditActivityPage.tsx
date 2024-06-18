import { useMultistepForm } from "../../utils/helpers/form/useMultistepForm";
import React, { FormEvent, useEffect, useState } from "react";
import { Header } from "../../components/header/Header";
import "./EditActivityPage.css";
import { ApiRoute, AppRoute } from "../../const";
import { useNavigate, useParams } from "react-router-dom";
import { UserFormEdit } from "../../components/userFormEdit/UserFormEdit";
import { DescriptionFormEdit } from "../../components/userFormEdit/DescriptionFormEdit";

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

type lessonInfoProps = [
  {
    schedule_id: string;
    subject_name: string;
    presentation_id: string;
    group_name: string;
    child_ids: [];
    start_lesson: string;
    teacher_id: string;
    description: string;
    is_for_child: boolean;
  },
];

export const lessonInfo: lessonInfoProps = [
  {
    schedule_id: "",
    subject_name: "",
    presentation_id: "",
    group_name: "",
    teacher_id: "",
    child_ids: [],
    start_lesson: "",
    description: "",
    is_for_child: false,
  },
];

export default function EditActivityPage() {
  const { organization, group, group_id, lesson, date, schedule_id } =
    useParams();
  console.log(organization, group, lesson, date, schedule_id);
  const [curdata, setCurdata] = useState(INITIAL_DATA);
  function updateFields(fields: Partial<FormData>) {
    setCurdata((prev) => {
      return { ...prev, ...fields };
    });
  }

  const [allInfo, setAllInfo] = useState<lessonInfoProps>(lessonInfo);

  useEffect(() => {
    fetch(`${ApiRoute}/lessons/${group_id}?date_day=${date?.split("T")[0]}`, {
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
        if (data.length !== 0 && group !== undefined) {
          setAllInfo(data);
        }
      });
  }, [group]);

  useEffect(() => {
    updateFields({
      isIndividual: allInfo[0].is_for_child,
      date: allInfo[0].start_lesson,
      listChildren: allInfo[0].child_ids,
      topic: allInfo[0].presentation_id,
      group: group,
    });
    console.log(
      "allInfo[0].start_lesson",
      allInfo,
      allInfo[0].start_lesson,
      allInfo[0].presentation_id,
      allInfo[0].is_for_child,
    );
  }, [allInfo]);

  console.log("allInfo11", allInfo);
  console.log("1", curdata);

  const { steps, currentStepIndex, step, isFirstStep, back, next, isLastStep } =
    useMultistepForm([
      <UserFormEdit {...curdata} updateFields={updateFields} />,
      <DescriptionFormEdit {...curdata} updateFields={updateFields} />,
    ]);

  const navigate = useNavigate();

  function onSubmitForm(e: FormEvent) {
    e.preventDefault();
    if (!isLastStep) return next();
    else {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");

      console.log(curdata.topic);

      let lesson = JSON.stringify({
        schedule: {
          schedule_id: schedule_id,
          presentation_id: curdata.topic,
          start_lesson: curdata.date,
        },
        child_ids: curdata.listChildren?.map(
          (child: { name: string; id: string }) => child.name,
        ),
      });

      let requestOptions = {
        method: "POST",
        headers: headers,
        body: lesson,
      };

      fetch(ApiRoute + `/lessons?group_id=${curdata.group}`, requestOptions);
    }
    navigate(`/${organization}${AppRoute.Main}`);
  }

  return (
    <>
      <Header />
      <div className="creat__text">Редактировать активность</div>
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
