import { ProjectModel } from '../../../../common/models/project.model';
import { OutsourcingModel } from '../../../../common/models/outsourcing.model';

export class SelectDetailModel {
  public projectModel: ProjectModel = new ProjectModel();
  public outsourcingArray: OutsourcingModel[] = [];
}
