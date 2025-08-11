/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ICartCriticalRepository } from '@modules/cart_criticals/repositories/ICartCriticalRepository';
import { inject, injectable } from 'tsyringe';
import IBomRepository from '@modules/bom/repositories/ICreateBomRepository';
import IMaterialManagerRepository from '@modules/material/repositories/IMaterialManagerRepository';
import CartCritical from '../infra/typeorm/entities/CartCriticals';

@injectable()
export default class FindCartCriticalService {
  constructor(
    // @ts-ignore
    @inject('CartCriticalRepository')
    private cartCriticalRepository: ICartCriticalRepository,

    @inject('BomRepository')
    private bomRepository: IBomRepository,

    @inject('MaterialManagerRepository')
    private materialRepository: IMaterialManagerRepository,
  ) {}

  async execute(): Promise<CartCritical[]> {
    const components = await this.cartCriticalRepository.findAllCartCritial()
    await Promise.all(components.map(async (item) => {

      const list = await this.materialRepository.findByStructCode(item.list_code);
      if (list){
        const bom = await this.bomRepository.findByComponentAlternativeComponent('Y',list.struct_code , item.component);
        if (bom) {
          const alternative_components: string[] = []
          // eslint-disable-next-line no-shadow
          bom.forEach((bom) => {
            if (bom.alternative_component != null) {
              alternative_components.push(bom.alternative_component)
            }
          });
          item.alternative_component = alternative_components
        }else{
          const alternative_components: string[] = []
          item.alternative_component = alternative_components
        }
      }else{
          const alternative_components: string[] = []
          item.alternative_component = alternative_components
      }
    }));

    return components.filter(item => item.id && item.quantity_kit).filter(item => {
      const percentage = (item.used_quantity / item.component_quantity) * 100
      const percentageKit = (item.used_quantity / item.quantity_kit) * 100

      return percentage >= item.usage_percentage && percentageKit < item.usage_percentage
    })
  }
}
