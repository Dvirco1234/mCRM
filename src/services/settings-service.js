import { userService } from './user.service.js'
import { httpService } from './http-service.js'

export const settingsService = {
    getDatalists,
}

async function getDatalists() {
    return await httpService.get('table')

}