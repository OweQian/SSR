import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { CMSDOMAIN } from '@/utils';

export interface IHomeProps {
  title: string;
  description: string;
}

const getHomeData = nextConnect()
  .get((req: NextApiRequest, res: NextApiResponse<IHomeProps>) => {
    axios.get(`${CMSDOMAIN}/api/homes`).then(result => {
      const { title, description } = result.data || {};
      res.status(200).json({
        title,
        description,
      })
    })
  })

export default getHomeData;
