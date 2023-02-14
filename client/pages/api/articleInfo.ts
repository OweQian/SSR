import axios from 'axios';
import nextConnect from 'next-connect';
import type { NextApiRequest, NextApiResponse } from 'next';
import { CMSDOMAIN } from '@/utils';
import { IArticleProps } from '@/pages/article/[articleId]';

const getArticleInfoData = nextConnect()
  .get((req: NextApiRequest, res: NextApiResponse<IArticleProps>) => {
    const { articleId } = req.query;
    axios.get(`${CMSDOMAIN}/api/article-infos/${articleId}`).then(result => {
      const data = result.data || {};
      res.status(200).json(data);
    })
  })

export default getArticleInfoData;
