"use server";
import { auth } from "@clerk/nextjs/server";
import { UserCreateType, UserType } from "../types/user.type";

export const getUsers = async () => {
  try {
    const { getToken } = await auth();
    const token = await getToken();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const getUserByClerkId = async (clerkId: string) => {
  try {
    const { getToken } = await auth();
    const token = await getToken();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/clerk/${clerkId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!res.ok) {
      return {
        sucess: false,
        message: `Error: ${res.status} ${res.statusText}`,
      };
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    return {
      success: false,
      message: "Error: Unable to fetch User by Clerk ID",
    };
  }
};

//create user request data : type of role must be a string
export const createUser = async (user: UserCreateType) => {
  try {
    const { getToken } = await auth();
    const token = await getToken();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const getInstructors = async () => {
  try {
    const { getToken } = await auth();
    const token = await getToken();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/instructors/all`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const updateUser = async (user: Partial<UserType>) => {
  try {
    const { getToken } = await auth();
    const token = await getToken();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${user.id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const getUserById = async (id: number) => {
  try {
    const { getToken } = await auth();
    const token = await getToken();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const deleteUser = async (id: number) => {
  try {
    const { getToken } = await auth();
    const token = await getToken();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
  }
};
