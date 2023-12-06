/*
    Post /setComputationDate ?
    Get /sheets/status readSheetStatus()
    Get /sheets/pending readPendingSheets()
    Post /sheets/pending/sign/sheetId signSheet()

    Get /sheets/:year/:salesman readSalesman()
    Get /sheets/:year
    Get /sheets/:salesman 
    Get /sheets/
*/
import { Router } from "express";

const router = Router();
