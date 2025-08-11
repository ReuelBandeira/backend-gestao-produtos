/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable radix */
import { Request, Response } from 'express';
import { log } from 'handlebars';
import QualityFamilyRepository from '../../typeorm/repositories/QualityFamilyRepository';
import QualityAllDefectsRepository from '../../typeorm/repositories/QualityAllDefectsRepository';
import QualityDefectsPositionRepository from '../../typeorm/repositories/QualityDefectsPositionRepository';
import QualityFailModeRepository from '../../typeorm/repositories/QualityFailModeRepository';
import QualityMonitorsInputRepository from '../../typeorm/repositories/QualityMonitorsInputRepository';
import QualityOriginRepository from '../../typeorm/repositories/QualityOriginRepository';
import QualityTeamRepository from '../../typeorm/repositories/QualityTeamRepository';
import QualityIndicatorShotRepository from '../../typeorm/repositories/QualityIndicatorShotRepository';
import QualityIndicatorProductionRepository from '../../typeorm/repositories/QualityIndicatorProductionRepository';
import QualityIndicatorDefectsRepository from '../../typeorm/repositories/QualityIndicatorDefectsRepository';


export default class QualityFamilyController {

  public async findDateQualityFamily(request: Request, response: Response): Promise<Response> {
    const {dateStart,dateEnd} = request.query;

    const model_quality_family = new QualityFamilyRepository();

    const model_quality_all_defects = new QualityAllDefectsRepository();

    const model_quality_defects_position = new QualityDefectsPositionRepository();

    const model_quality_fail_mode = new QualityFailModeRepository();

    const quality_family = await model_quality_family.DateQualityFamily(dateStart,dateEnd);

    const quality_all_defects = await model_quality_all_defects.DateQualityAllDefects(dateStart,dateEnd);

    const quantity_defects = quality_all_defects.length;

    const quality_defects_position = await model_quality_defects_position.QualityDefectsPosition(dateStart,dateEnd);

    const quality_fail_mode = await model_quality_fail_mode.DateQualityFailMode(dateStart,dateEnd);


    return response.json({
      quality_family,
      quality_all_defects: quantity_defects,
      quality_defects_position,
      quality_fail_mode,
    });
  }

  public async InputOriginTeam (request: Request, response: Response): Promise<Response> {

    const {dateStart,dateEnd} = request.query;

    const model_quality_monitors_input = new QualityMonitorsInputRepository();

    const model_quality_origin = new QualityOriginRepository();

    const model_quality_team = new QualityTeamRepository();

    const quality_monitors_input = await model_quality_monitors_input.DateQualityMonitorsInput(dateStart,dateEnd);

    const quality_origin = await model_quality_origin.repairOrigin(dateStart,dateEnd);

    const quality_team = await model_quality_team.DateQualityTeam(dateStart,dateEnd);

    return response.json({
      quality_monitors_input,
      quality_origin,
      quality_team
    });
  }



  public async dpmuIndicator (request: Request, response: Response): Promise<Response> {

    const {dateStart,dateEnd} = request.query;

    const model_quality_indicator_production = new QualityIndicatorProductionRepository();
    const model_defect = new QualityIndicatorDefectsRepository();

    const all_production_consult = await model_quality_indicator_production.productionShotDefect(dateStart,dateEnd);

    function sumProductionWithoutDuplicates(productionData) {
      const summedData = {};

      productionData.forEach((item) => {
        const key = `${item.id_line  }_${  item.model_name}`;
        if (!summedData[key]) {
          summedData[key] = { ...item };
        } else {
          summedData[key].production += item.production;
        }
      });

      return Object.values(summedData);
    }

    const resultProduction = sumProductionWithoutDuplicates(all_production_consult);

    const all_defects = await model_defect.allDefect(dateStart,dateEnd);

    function sumdefectWithoutDuplicates(defectData) {
      const summedData = {};

      defectData.forEach((item) => {
        const key = `${item.id_line  }_${  item.model_name}`;
        if (!summedData[key]) {
          summedData[key] = { ...item };
        } else {
          summedData[key].defect += item.defect;
        }
      });

      return Object.values(summedData);
    }

    const resultdefect = sumdefectWithoutDuplicates(all_defects);

    function mergeDefectData(productionArray, defectArray) {
      const mergedArray = productionArray.map((item) => {
        const matchingDefectItem = defectArray.find(
          (defectItem) =>
            defectItem.id_line === item.id_line &&
            defectItem.model_name === item.model_name
        );

        const defectValue = matchingDefectItem ? matchingDefectItem.defect : 0;

        return {
          ...item,
          defect: defectValue,
        };
      });

      return mergedArray;
    }

    const all_production = mergeDefectData(resultProduction, resultdefect);

    // Create an object to store the sums based on model_name and id_line
      const sums = {};

      // Loop through all_production array
      all_production.forEach(item => {
        // Create a unique key based on model_name and id_line
        const key = `${item.model_name  }_${  item.id_line}`;

        // Check if the key already exists in the sums object
        if (sums[key]) {
          // If it exists, add the values to the existing sums
          sums[key].production += item.production;
          sums[key].defect += item.defect;
          sums[key].shot += item.shot;
        } else {
          // If it doesn't exist, create a new entry in the sums object
          sums[key] = {
            id_line: item.id_line,
            line_name: item.line_name,
            model_name: item.model_name,
            production: item.production,
            defect: item.defect,
            shot: item.shot
          };
        }
      });

      const dpmu_Indicator = Object.values(sums);

      const result = dpmu_Indicator.map(item => {
        let ppm = 0;
        let ppm_percentage = 0;

        if (item.defect !== 0 && item.production !== 0) {
          ppm = (item.defect / (item.production * item.shot)) * 1000000;
          ppm_percentage = (item.defect / (item.production * item.shot));
          // ppm_percentage = ((ppm )/ (10000));
          // ppm_percentage = ppm * ( 1000000 / 100);
        }

        return {
          ...item,
          ppm,
          ppm_percentage
        };
      });

    return response.json({
      dpmu_Indicator:result
    });
  }

  public async ModeldpmuIndicator (request: Request, response: Response): Promise<Response> {

    const {dateStart,dateEnd} = request.query;

    const model_quality_indicator_production = new QualityIndicatorProductionRepository();
    const model_defect = new QualityIndicatorDefectsRepository();

    const all_production_consult = await model_quality_indicator_production.productionShotDefect(dateStart,dateEnd);
    const all_defects = await model_defect.allDefect(dateStart,dateEnd);


    function sumProductionWithoutDuplicates(productionData) {
      const summedData = {};

      productionData.forEach((item) => {
        const key =  item.model_name;
        if (!summedData[key]) {
          summedData[key] = { ...item };
        } else {
          summedData[key].production += item.production;
        }
      });

      return Object.values(summedData);
    }

    const resultProduction = sumProductionWithoutDuplicates(all_production_consult);


    function sumdefectWithoutDuplicates(defectData) {
      const summedData = {};

      defectData.forEach((item) => {
        const key = item.model_name;
        if (!summedData[key]) {
          summedData[key] = { ...item };
        } else {
          summedData[key].defect += item.defect;
        }
      });

      return Object.values(summedData);
    }

    const resultdefect = sumdefectWithoutDuplicates(all_defects);

    function mergeDefectData(productionArray, defectArray) {
      const mergedArray = productionArray.map((item) => {
        const matchingDefectItem = defectArray.find(
          (defectItem) =>
            defectItem.id_line === item.id_line &&
            defectItem.model_name === item.model_name
        );

        const defectValue = matchingDefectItem ? matchingDefectItem.defect : 0;

        return {
          ...item,
          defect: defectValue,
        };
      });

      return mergedArray;
    }

    const all_production = mergeDefectData(resultProduction, resultdefect);


    const model_indicator = Object.values(all_production.reduce((acc, curr) => {
      const { model_name, production, defect, shot } = curr;
      if (!acc[model_name]) {
        acc[model_name] = {
          model_name,
          production: 0,
          defect: 0,
          shot: 0
        };
      }
      acc[model_name].production += production;
      acc[model_name].defect += defect;
      acc[model_name].shot += shot;
      return acc;
    }, {}));

    const result = model_indicator.map(item => {
      let ppm = 0;
      let ppm_percentage = 0;

      if (item.defect !== 0 && item.production !== 0) {

        ppm = ((item.defect) / (item.production * item.shot)) * 1000000;
        ppm_percentage = (item.defect / (item.production * item.shot));
      }
      return {
        ...item,
        ppm,
        ppm_percentage
      };
    });

    //  o shot é multiplicado pela produção
    const result_shot = result.map(item => ({ ...item, shot: item.shot * item.production }));

    // teste de subida

    return response.json({
      model_indicator:result_shot
    });
  }

}



