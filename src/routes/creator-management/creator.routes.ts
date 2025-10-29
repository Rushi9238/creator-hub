import {Router} from 'express'
import { upload } from '../../middlewares/multer.middleware'
import { authorityCheck } from '../../middlewares/authorityCheck.middleware'
import { getCreators,createCreator,updateCreator,getCreatorByID,deleteCreator } from '../../controllers/creator-management/creatorController'

export const creatorRouter=Router()

creatorRouter.route('/').get(authorityCheck,getCreators)
creatorRouter.route('/:id').get(authorityCheck,getCreatorByID)
creatorRouter.route('/').post(upload.none(),authorityCheck,createCreator)
creatorRouter.route('/:id').put(upload.none(),authorityCheck,updateCreator)
creatorRouter.route('/:id').delete(authorityCheck,deleteCreator)