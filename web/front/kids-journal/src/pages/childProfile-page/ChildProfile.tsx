import React, { useEffect, useState } from "react";
import { Header } from "../../components/header/Header";
import { Link, useParams } from "react-router-dom";
import "./ChildProfile.css";
import { ApiRoute, testOrganization } from "../../const";
import { child, parent } from "../../components/groupInfo/GroupInfo";
import { useAppSelector } from "../../hooks/useAppDispatch";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box, Checkbox,
} from "@chakra-ui/react";
import { infoTopic } from "../subject-page/SubjectPage";

type ChildProfileProps = {};

type Tsubject = {
  subject_id: string;
  name: string;
  description: string;
  age_range: string;
};

const subjectExample: Tsubject = {
  subject_id: "",
  name: "",
  description: "",
  age_range: "",
};

function ChildProfile({}: ChildProfileProps): JSX.Element {
  const [children, setChildren] = useState(child);
  const { organization, group, childName } = useParams();

  useEffect(() => {
    fetch(`${ApiRoute}/children/${childName}`, {
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

  const data = useAppSelector((state) => {
    return state.groups;
  });

  const ageChildGroup = data.groups
    .filter((x) => x.group_id === group)
    .map((x) => x.age_range);
  const groupName = data.groups
    .filter((x) => x.group_id === group)
    .map((x) => x.name);

  const [valueSubject, setSubject] = useState<[Tsubject]>([subjectExample]);

  useEffect(() => {
    fetch(`${ApiRoute}/organizations/${testOrganization}/subjects`, {
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
        setSubject(data);
      });
  }, []);

  const [presentations, setPresentations] = useState(infoTopic);
  const [curSubject, setCurSubject] = useState("");

  useEffect(() => {
    if (curSubject !== "") {
      setPresentations(infoTopic);
      fetch(`${ApiRoute}/subjects/${curSubject}/presentations`, {
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
          setPresentations(data);
        });
    }
  }, [curSubject]);

  const [parents, setParents] = useState([parent]);

  useEffect(() => {
    fetch(`${ApiRoute}/parents/child/${childName}`, {
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
        console.log("data", data);
        setParents(data);
      });
  });
  console.log("parents", parents);

  const filteredSubject = valueSubject.filter(
    (x) => x.age_range === ageChildGroup[0],
  );

  return (
    <>
      <Header />
      <div className="child_profile-container">
        <header className="child__info">
          <div className="child__info-img"></div>
          <div className="child__info_block">
            <header className="child__info_block-header">
              <div className="child_name">
                {children.first_name + " " + children.last_name}
              </div>
              <div className="child_group">Группа «{groupName[0]}»</div>
            </header>
            <main className="child__info_block-main">
              <div className="child_age">
                Возраст:{" "}
                {new Date().getFullYear() -
                  new Date(children.birth_date).getFullYear()}
              </div>
              <div className="child_parents">
                <div className="child_parents-title">Родители</div>
                <div className="child_parent">
                  <div>
                    Родитель:{" "}
                    {parents !== null
                      ? parents[0].first_name + " " + parents[0].last_name
                      : ""}
                  </div>
                  <div>
                    Номер телефона:{" "}
                    {parents !== null ? parents[0].phone_number : ""}
                  </div>
                </div>
                <div className="child_parent">
                  <div>
                    Родитель:{" "}
                    {parents !== null && parents[1] !== undefined
                      ? parents[1].first_name + " " + parents[1].last_name
                      : ""}
                  </div>
                  <div>
                    Номер телефона:{" "}
                    {parents !== null && parents[1] !== undefined
                      ? parents[1].phone_number
                      : ""}
                  </div>
                </div>
              </div>
              <div className="child_teacher">
                <div className="child_teacher-title">Воспитатель</div>
                <div className="child_teacher-info">
                  <div>{childName}</div>
                  <div>Номер телефона: {childName}</div>
                </div>
              </div>
            </main>
          </div>
        </header>
        <section className="child__progress">
          <div className="child__progress-title">Прогресс ребенка</div>
          <div className="subjects">
            <Accordion allowToggle>
              {filteredSubject.map((subject) => (
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box
                        onClick={() => setCurSubject(subject.name)}
                        as="span"
                        flex="1"
                        textAlign="left"
                      >
                        <div style={{display:"flex", justifyContent:"space-between"}}>
                          <div>{subject.name}</div>
                          <div style={{paddingRight:"200px"}}>
                            {subject.name === "Лепка"
                                ? "100%"
                                : "0%"}
                          </div>
                        </div>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <table className="subject__table">
                      <thead className="subject-title">
                        <tr>
                          <td className="subject-title_name">Название темы</td>
                          <td className="subject-description">Прогресс</td>
                        </tr>
                      </thead>
                      <tbody>
                        {presentations?.map((currentTopic) => (
                          <tr className="subject-item">
                            <td className="subject-item_name">
                              {currentTopic.name}
                            </td>
                            <td className="subject-item_description">
                              <Checkbox
                                  isDisabled
                                  defaultChecked={currentTopic.name === "Раскатать пластелин"}
                                  size="lg"
                                  className="progress-item_grade-check"
                                  colorScheme="green"
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </div>
    </>
  );
}

export default ChildProfile;
