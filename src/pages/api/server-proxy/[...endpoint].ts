import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";

const ApiUrl = process.env.API_URL;

export default withApiAuthRequired(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { endpoint } = req.query;
    const { accessToken } = await getAccessToken(req, res);

    const response = await fetch(
      `${ApiUrl}/${(endpoint as string[]).join("/")}`,
      {
        method: req.method,
        body: req.body ? JSON.stringify(req.body) : undefined,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (response.status === 204) {
      res.status(204).json({});
      return;
    }

    const data = await response.json();
    res.status(response.status).json(data);
  }
);
