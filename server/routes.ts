import type { Express } from "express";
import { createServer, type Server } from "http";
import axios from "axios";

export async function registerRoutes(app: Express): Promise<Server> {
  // Exchange rates endpoint
  app.get("/api/exchange-rates", async (req, res) => {
    try {
      const baseCurrency = (req.query.base || "USD") as string;

      // Fetch from external API
      const response = await axios.get(
        `https://open.er-api.com/v6/latest/${baseCurrency}`
      );

      const rates = response.data.rates;
      res.json(rates);
    } catch (error) {
      console.error("Error fetching exchange rates:", error);
      res.status(500).json({ message: "Failed to fetch exchange rates" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}