import TravelMarkers from '@/data/travel.json';
import ResumeData from '@/data/resume.json';

export class DataService {

  static getTravelMarkers = () => TravelMarkers.markers;

  static getResumeExperience = () =>
    ResumeData.work;


  static getResumeEducation = () =>
    ResumeData.education;


  static getResumeCertificates = () =>
    ResumeData.certificates;


  static getFreelancingProjects = () =>
    ResumeData.freelancing;

}
