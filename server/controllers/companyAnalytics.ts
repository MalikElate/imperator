import { Request, Response } from 'express';
import { CompanyDB } from '../models/documents/Company';

// comment
export const singleCompany = async (
  req: Request,
  res: Response
): Promise<void> => {
  try { 
   const data = await CompanyDB.aggregate([
      {
        $search: {
          "text": {
            "query": "6018596184af92843a7bb1c0",
            "path": "_id" //local field to look for the query input
          }
        }
      },{
            $lookup: { //join table users
            from: 'users',
            localField: 'company', //is the field from companies
            foreignField: 'company', //field from users
            as: 'users_data' //name that hold results 
            }
        },
        {
        $project: {
          "_id": 0, 
          "email": 1, 
          "company": 1, 
          "billing.status": 1,
          "billing.customerId": 1,
          "billing.plan": 1,
          "billing.trialStart": 1,
          "activeUntil": 1,
          "jira": 1,
          "zapier": 1,
          hashtagsTotal: {$size: "$hashtags"},
          documentsTotal: {$size: "$documents"},
          projectsTotal: {$size: "$projects"},
          notesTotal: {$size: "$notes"},
          insightsTotal: {$size: "$insights"},
          collectionsTotal: {$size: "$collections"},
          recommendationsTotal: {$size: "$recommendations"}
        }},
    ]);
    res.send(data[0]);
  } catch (error) {
    console.error('Error getting total actions: ', error);
  }
};

export const allCompany = async ( req: Request, res: Response ): Promise<void> => {
  try {
    const data = await CompanyDB.aggregate([
      { $count: 'Total_Companies' },
      {
        $lookup: {
          from: 'hashtags',
          pipeline: [
            {
              $group: {
                _id: 0,
                count: { $sum: 1 },
              },
            },
          ],
          as: 'hashtags',
        },
      },
      {
        $lookup: {
          from: 'documents',
          pipeline: [
            {
              $group: {
                _id: 0,
                count: { $sum: 1 },
              },
            },
          ],
          as: 'documents',
        },
      },
      {
        $lookup: {
          from: 'insights',
          pipeline: [
            {
              $group: {
                _id: 0,
                count: { $sum: 1 },
              },
            },
          ],
          as: 'insights',
        },
      },
      {
        $lookup: {
          from: 'notes',
          pipeline: [
            {
              $group: {
                _id: 0,
                count: { $sum: 1 },
              },
            },
          ],
          as: 'notes',
        },
      },
      {
        $lookup: {
          from: 'projects',
          pipeline: [
            {
              $group: {
                _id: 0,
                count: { $sum: 1 },
              },
            },
          ],
          as: 'projects',
        },
      },
      { $unwind: { path: '$hashtags' } },
      { $unwind: { path: '$documents' } },
      { $unwind: { path: '$insights' } },
      { $unwind: { path: '$notes' } },
      { $unwind: { path: '$projects' } },
      {
        $project: {
          'hashtags._id': 0,
          'documents._id': 0,
          'insights._id': 0,
          'notes._id': 0,
          'projects._id': 0,
        },
      },
    ]);
    res.send([
      (data[0].hashtags.count)/(data[0].Total_Companies),
      (data[0].documents.count)/(data[0].Total_Companies),
      (data[0].insights.count)/(data[0].Total_Companies),
      (data[0].notes.count)/(data[0].Total_Companies),
    ]);
    console.log(data[0]);
  } catch (error) {
    console.error('Error getting total actions: ', error);
  }
};