import { Request, Response } from 'express';
import { CompanyDB } from '../models/documents/Company';

// Aggregation for trails that are ending this month on strategic dashboard 
const strategicTrialPlan = async (req: Request, res: Response): Promise<void> => {
    try {
      const data = await CompanyDB.aggregate(
        [
          {$match: {
            'billing.plan': 'Trial'
          }},
          {$project: {
            _id: 1,
            company: 1,
            day: {$dayOfMonth: {$toDate: {$multiply: ["$billing.trialEnd", 1000]}}},
            month: {$month: {$toDate: {$multiply: ["$billing.trialEnd", 1000]}}},
            year: {$year: {$toDate: {$multiply: ["$billing.trialEnd", 1000]}}}
          }},
          {$match: {
          "month":new Date().getMonth() +1,
          "year": new Date().getFullYear()
          }
        },
        {$sort: {day: 1}}
      ]
     )
     res.send(data)
    } catch (error) {
      console.error('Error in strategicTrialPlan controller', error);
    }
};



  
export default strategicTrialPlan;