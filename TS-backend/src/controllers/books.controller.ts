import { PrismaClient } from "@prisma/client";
import { Book } from "@prisma/client";


const db = new PrismaClient();
import { Request, Response } from "express";

export const getAllBooks = async (req: Request, res: Response): Promise<void> => {
  res.json(await db.book.findMany());
};

export const getBookById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const book = await db.book.findUnique({ where: { id } });

  if (!book)
    res.status(404).json({ message: "Book not found" });

  res.json(book);
};

export const createBook = async (req: Request, res: Response): Promise<void> => {
  const { title, author, price } = req.body;

  if (!title || !author || !price)
    res.status(400).json({ message: "Invalid book data" });

  const bookData: Omit<Book, "id"> = {
    title,
    author,
    price
  };

  res.json(await db.book.create({ data: bookData }));
};

export const updateBook = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { title, author, price } = req.body;

  if (!title || !author || !price)
    res.status(400).json({ message: "Invalid book data" });

  const bookData: Omit<Book, "id"> = {
    title,
    author,
    price,
  };

  const book = await db.book.update({
    where: { id },
    data: bookData,
  });

  if (!book)
    res.status(404).json({ message: "Book not found" });

  res.json(book);
};

export const deleteBook = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const book = await db.book.delete({ where: { id } });

  if(!book)
    res.status(404).json({ message: "Book not found" });

  res.json(book);
}