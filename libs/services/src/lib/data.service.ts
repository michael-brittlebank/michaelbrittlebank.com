import {
  ResumeData as ResumeDataType,
  ResumeEntry,
  TravelMarker,
} from '@mikestumpf/types';
import TravelMarkers from './data/travel.json';
import ResumeData from './data/resume.json';
import { memoize } from 'lodash';

export class DataService {
  static getResumeData = memoize((): ResumeDataType => ResumeData);

  static getTravelMarkers = memoize(
    (): TravelMarker[] => TravelMarkers.markers,
  );

  static getResumeExperience = memoize(
    (): ResumeEntry[] => DataService.getResumeData().work,
  );

  static getResumeEducation = memoize(
    (): ResumeEntry[] => DataService.getResumeData().education,
  );

  static getResumeCertificates = memoize(
    (): ResumeEntry[] => DataService.getResumeData().certificates,
  );
}
