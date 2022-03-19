import { object, string, date, number, ref } from "yup";

export const loginFormSchema = object({
  email: string().required().email().label("Email"),
  password: string().required().label("Password"),
});

export const registerFormSchema = object({
  name: string().required().label("Name"),
  email: string().required().email().label("Email"),
  password: string().required().label("Password"),
  password_confirmation: string()
    .required()
    .oneOf([ref("password"), null], "Passwords must match")
    .label("Password confirmation"),
});

export const categoryFormSchema = object({
  name: string().required().label("Category name"),
  color: string().required().label("Color"),
});

const today = new Date();
export const taskFormSchema = object({
  name: string().required().min(3).label("Task name"),
  category: number().required().label("Category"),
  description: string().label("Description"),
  due_date: date().required().min(today).label("Due date"),
  status: string().oneOf(["", "in-progress", "completed"]).label("Status"),
});
