import {Router} from 'express'
import { authorityCheck } from '../../middlewares/authorityCheck.middleware'
import { getAllActivityLogs, userActivityLogs } from '../../controllers/creator-management/creatorsLogs.controller'

export const activityLogsRoute=Router()

activityLogsRoute.route('/').get(authorityCheck,getAllActivityLogs)
activityLogsRoute.route('/my-logs').get(authorityCheck,userActivityLogs)