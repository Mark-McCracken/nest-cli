import {Processor} from '../../../../common/asset/interfaces/processor.interface';
import {CreateProjectProcessor} from '../create-project.processor';
import {Project} from '../../../../common/project/interfaces/project.interface';
import {SourceType} from '../../../../common/project/enums/source.type.enum';

describe('CreateProjectProcessor', () => {
  const project: Project = {
    name: 'name',
    source: {
      type: SourceType.GIT,
      value: 'value'
    }
  };

  it('can be created', () => {
    const processor: Processor = new CreateProjectProcessor(project);
  });
});
