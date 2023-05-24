/**
    External modules and Interfaces
*/

import express, { Request, Response } from "express";
import * as ItemService from "./items.service";
import { Item, BaseItem } from "./item.interface";

/**
    Router Definition
*/

export const router = express.Router();

/**
    Controllers
    TODO - Improve to support database integration
    */

/**
        Get all items
        @params req - Request 
        @params res - Response
        @params next - Next Middleware
        @returns void
    
    */
router.get("/", async (req: Request, res: Response) => {
  try {
    const data: Item[] = await ItemService.findAll();
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json(e);
  }
});

/**
    Get item by id
    @param id
    @params req - Request 
    @params res - Response
    @params next - Next Middleware
    @returns void
    @returns object
    TODO- ADD AUTHENTICATION AND AUTHORIZATION
*/
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id);
    console.log(id);
    const data: Item = await ItemService.findById(id);
    if (!data) {
      res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json(e);
  }
});

/**
    Create item
    @params req - Request 
    @params res - Response
    @params next - Next Middleware
    @returns void
    @returns object
*/
router.post("/", async (req: Request, res: Response) => {
  try {
    const item: BaseItem = req.body;
    if (!item.name || !item.price || !item.description || !item.image) {
      res.status(400).json({ message: "Please fill all fields" });
    }
    await ItemService.create(item);
    res.status(201).json({ message: "Item created" });
  } catch (e) {
    res.status(500).json(e);
  }
});

/**
    Update item
    @params req - Request 
    @params res - Response
    @params next - Next Middleware
    @returns void
    @returns object
*/

router.put("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);

  try {
    const item: BaseItem = req.body;
    if (!item.name || !item.price || !item.description || !item.image) {
      res.status(400).json({ message: "Please fill all fields" });
    }
    await ItemService.update(id, item);
    res.status(200).json({ message: "Item updated" });
  } catch (e) {
    res.status(500).json(e);
  }
});

/**
    Delete item
    @params req - Request 
    @params res - Response
    @returns void
    @returns object
*/

router.delete("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);

  try {
    await ItemService.remove(id);
    res.status(200).json({ message: "Item deleted" });
  } catch (e) {
    res.status(500).json(e);
  }
});
