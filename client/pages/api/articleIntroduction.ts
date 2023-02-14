import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { CMSDOMAIN } from '@/utils';

export interface IArticleIntroduction {
  label: string;
  info: string;
  articleId: number;
}

export interface IArticleIntroductionProps {
  list: IArticleIntroduction[];
  total: number;
}

const ArticleIntroductionData = nextConnect()
  .post((req: NextApiRequest, res: NextApiResponse<IArticleIntroductionProps>) => {
    const { pageNo, pageSize } = req.body;
    axios.get(`${CMSDOMAIN}/api/article-introductions`, {
      params: {
        pageNo,
        pageSize,
      }
    }).then(result => {
      const { data, meta } = result.data || {};
      res.status(200).json({
        list: Object.values(data),
        total: meta.pagination.total,
      })
    })
  })

export default ArticleIntroductionData;
