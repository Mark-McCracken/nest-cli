import {Processor} from '../../../common/asset/interfaces/processor.interface';
import {Project} from '../../../common/project/interfaces/project.interface';

export class CreateProjectProcessor implements Processor {
  constructor(private _project: Project) {}

  public process(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
