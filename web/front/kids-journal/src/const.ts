export const ApiRoute = "https://d5de0lctsr23htkj7hlj.apigw.yandexcloud.net"
export const AppRoute = {
  WelcomeScreen: "/",
  Main: "/main",
  SignIn: "/login",
  SignUp: "/sign-up",
  Organizations: "/:organization",
  Groups: "/groups",
  Activity: "/activity",
  Subject: "/subject",
  Employees: "/employees",
  Progress: "/progress",
  CreateActivity: "/createActivity",
  CreateGroups: "/createGroups",
  EditGroups: "/editGroups",
  EditEmployee: "/editEmployee",
  CreateEmployees: "/createEmployees",
  CreateSubject: "/createSubject",
  CreateOrganization: "/createOrganization",
  AddChild: "/addChild",
  Error: "/*",
};

export const skill_level_id_no = "f643625b-a43d-4e45-bc6e-85379b8d3e05";
export const skill_level_id_yes = "cc8442dc-ffbf-4cd8-ae63-cb160e72ec12";


export const TIMEOUT_SHOW_ERROR = 2000;

export const LoginUrl = "https://d5de0lctsr23htkj7hlj.apigw.yandexcloud.net/login";

export const testOrganization = "3ff0a6a4-0634-4d9a-8239-52bfa7bfe776"

export enum AuthorizationStatus {
  Auth = "AUTH",
  NoAuth = "NO_AUTH",
  Unknown = "UNKNOWN",
}

export const infoOrganization = [
  {
    name: "Добрый_Мир",
    id: "1",
  }
];

export const infoGroups = [
  {
    organization: "Садик №1",
    carouselLabel: "Одуванчики",
    carouselAge: "0-3",
    carouselAction: [
      {
        carouselActionData: "2024-01-15T19:23",
        subject: "Что-то",
        carouselActionTitle: "Застегивание пуговиц",
        carouselActionCategory: true,
        children: [
          {
            name: "Болтов Егор",
          },
        ],
        description: "",
      },
      {
        carouselActionData: "2024-01-16T19:26",
        subject: "Что-то",
        carouselActionTitle: "Клеим марки",
        carouselActionCategory: false,
        children: [],
        description:
          "qwertyuikjbfbvjbdfvbgjfnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnjk",
      },
      {
        carouselActionData: "2024-01-16T19:26",
        subject: "Что-то",
        carouselActionTitle: "Клеим марки",
        carouselActionCategory: false,
        children: [],
        description:
          "qwertyuikjbfbvjbdfvbgjfnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnjk",
      },
      {
        carouselActionData: "2024-01-16T19:26",
        subject: "Что-то",
        carouselActionTitle: "Клеим марки",
        carouselActionCategory: false,
        children: [],
        description:
          "qwertyuikjbfbvjbdfvbgjfnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnjk",
      },
      {
        carouselActionData: "2024-01-16T19:26",
        subject: "Что-то",
        carouselActionTitle: "Клеим марки",
        carouselActionCategory: false,
        children: [],
        description:
          "qwertyuikjbfbvjbdfvbgjfnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnjk",
      },
      {
        carouselActionData: "2024-01-16T19:26",
        subject: "Что-то",
        carouselActionTitle: "Клеим марки",
        carouselActionCategory: false,
        children: [],
        description:
          "qwertyuikjbfbvjbdfvbgjfnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnjk",
      },
      {
        carouselActionData: "2024-01-16T19:26",
        subject: "Что-то",
        carouselActionTitle: "Клеим марки",
        carouselActionCategory: false,
        children: [],
        description:
          "qwertyuikjbfbvjbdfvbgjfnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnjk",
      },
      {
        carouselActionData: "2024-01-16T19:26",
        subject: "Что-то",
        carouselActionTitle: "Клеим марки",
        carouselActionCategory: false,
        children: [],
        description:
          "qwertyuikjbfbvjbdfvbgjfnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnjk",
      },
    ],
    group_child: [
      {
        id: "",
        name: "Болтов Егор",
        birth_date: "2007-12-01",
        parents: [
          {
            id: "",
            name: "Болтова Инна Владимирована",
            phone_number: "+79998887766",
          },
        ],
      },
      {
        id: "",
        name: "Болтов Егорp",
        birth_date: "2007-12-01",
        parents: [
          {
            id: "",
            name: "Болтова Инна Владимирована",
            phone_number: "+79998887766",
          },
        ],
      },
    ],
  },
  {
    organization: "Садик №1",
    carouselLabel: "Ромашки",
    carouselAge: "3-6",
    carouselAction: [
      {
        carouselActionData: "2024-01-15T19:26",
        subject: "Что-то",
        carouselActionTitle: "Пить сок",
        carouselActionCategory: true,
        children: [
          {
            name: "Болтов Егор",
          },
          {
            name: "Болтов Егорр",
          },
        ],
        description: "",
      },
    ],
    group_child: [
      {
        id: "",
        name: "Болтов Егор",
        birth_date: "2007-12-01",
        parents: [
          {
            id: "",
            name: "Болтова Инна Владимирована",
            phone_number: "+79998887766",
          },
        ],
      },
    ],
  },
  {
    organization: "Садик №1",
    carouselLabel: "Васильки",
    carouselAge: "6-9",
    carouselAction: [
      {
        carouselActionData: "2024-01-15T19:26",
        subject: "Что-то",
        carouselActionTitle: "Застегивание пуговиц",
        carouselActionCategory: false,
        children: [],
        description: "",
      },
    ],
  },
  {
    organization: "Садик №1",
    carouselLabel: "Васильки",
    carouselAge: "6-9",
    carouselAction: [
      {
        carouselActionData: "2024-01-15T19:26",
        subject: "Что-то",
        carouselActionTitle: "Застегивание пуговиц",
        carouselActionCategory: true,
        children: [
          {
            name: "Болтов Егор",
          },
          {
            name: "Болтов Егорр",
          },
        ],
        description: "",
      },
    ],
    group_child: [
      {
        id: "",
        name: "Болтов Егор",
        birth_date: "2007-12-01",
        parents: [
          {
            id: "",
            name: "Болтова Инна Владимирована",
            phone_number: "+79998887766",
          },
        ],
        description: "",
      },
    ],
  },
];

export const infoEmployees = [
  {
    organization: "Садик №1",
    name: "Болтов Егор",
    role_id: "Администратор",
    phone_number: "+79998887766",
  },
  {
    organization: "Садик Вишенка",
    name: "Викулова Света",
    role_id: "Педагог",
    phone_number: "+79998887766",
  },
];

export const subjectInfo = [
  {
    organization: "Садик №1",
    name: "qwef",
    topic: [
      { name: "qwert", age: "3-6", description: "" },
      { name: "qwert11", age: "0-3", description: "" },
    ],
  },
  {
    organization: "Садик №1",
    name: "yqwef11",
    topic: [{ name: "qwert", age: "3-6", description: "" }],
  },
  {
    name: "qwef",
    topic: [
      { name: "qwert", age: "3-6", description: "" },
      { name: "qwert11", age: "0-3", description: "" },
    ],
  },
];


export let hoho = {}