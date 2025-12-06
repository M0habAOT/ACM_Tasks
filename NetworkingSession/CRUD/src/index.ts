import express, { Request, Response, Application } from 'express';
// let express = require("express");
const app: Application = express();

interface Client {
   id: string;
   userName: string;
   pass: number;
}

interface ApiResponse<T = any> {
   message: string;
   data?: T;
   error?: string;
   timeStamp?: Date;
}

interface CustomError extends Error {
   statusCode?: number;
   timeStamp?: Date;
}

// CRUD
// incomingReq, outgoingRes

const clients: Client[] = [
   { id: "1", userName: "Thomas", pass: 123 }
]

app.use(express.json());

app.post("/register", (req: Request, res: Response) => {
   try {
      const data: Client = req.body;

      if (!data.id || !data.userName || !data.pass) {
         const error: CustomError = new Error("Missing required fields");
         error.statusCode = 400;
         throw error;
      }

      clients.push(data);

      const response: ApiResponse<Client> = {
         message: "User registered successfully",
         data: data
      };
      res.status(201).json(response);

   } catch (error: unknown) {
      const err = error as CustomError;
      res.status(err.statusCode || 500).json({
         message: err.message,
         error: "Registration failed"
      });
   }
})

app.get("/users", (req: Request, res: Response) => {
   const response: ApiResponse<Client[]> = {
      message: "Users retrieved successfully",
      data: clients
   };
   res.json(response);
})

app.get("/users/:id", (req: Request, res: Response) => {
   try {
      const userId = req.params.id;
      const user = clients.find(client => client.id === userId);

      if (!user) {
         const error: CustomError = new Error("User not found");
         error.statusCode = 404;
         throw error;
      }

      const response: ApiResponse<Client> = {
         message: "User retrieved successfully",
         data: user
      };
      res.json(response);
   } catch (error: unknown) {
      const err = error as CustomError;
      res.status(err.statusCode || 500).json({
         message: err.message,
         error: "User retrieval failed"
      });
   }
})


app.delete("/users/:id", (req, res) => {
   try {
      const userId = req.params.id;
      const initialLength = clients.length;

      for (let i = 0; i < clients.length; i++) {
         if (clients[i].id === userId) {
            clients.splice(i, 1);
            break;
         }
      }

      if (clients.length === initialLength) {
         const error: CustomError = new Error("User not found");
         error.statusCode = 404;
         throw error;
      }

      const response: ApiResponse = {
         message: "User deleted successfully"
      };
      res.status(200).json(response);
   } catch (error: unknown) {
      const err = error as CustomError;
      res.status(err.statusCode || 500).json({
         message: err.message,
         error: "Deletion failed"
      });
   }
})

app.patch("/users/:id", (req, res) => {
   try {
      const userId = req.params.id;
      const updates: Partial<Client> = req.body;

      let userFound = false;
      let userIndex = -1;

      for (let i = 0; i < clients.length; i++) {
         if (clients[i].id === userId) {
            userIndex = i;
            userFound = true;
            break;
         }
      }

      if (!userFound) {
         const error: CustomError = new Error("User not found");
         error.statusCode = 404;
         throw error;
      }

      const updatedUser: Client = {
         ...clients[userIndex],
         ...updates
      };
      clients[userIndex] = updatedUser;

      const response: ApiResponse<Client> = {
         message: "User updated successfully",
         data: updatedUser
      };
      res.status(200).json(response);
   } catch (error: unknown) {
      const err = error as CustomError;
      res.status(err.statusCode || 500).json({
         message: err.message,
         error: "Update failed"
      });
   }
})

app.listen(3000, () => {
   console.log("Server running on port 3000");
})
