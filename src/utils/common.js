import { STATUSES, STEPS } from "./constants";

export const calculateStatus = (step) => {
  switch (step) {
    case STEPS.RESUME_SCREEN:
      return STATUSES.APPLIED;
    case STEPS.RECRUITER_CALL:
      return STATUSES.IN_PROGRESS;
    case STEPS.RECOMMENDATIONS:
      return STATUSES.IN_PROGRESS;
    case STEPS.ONSITE_INTERVIEWS:
      return STATUSES.IN_PROGRESS;
    case STEPS.HR_INTERVIEWS:
      return STATUSES.IN_PROGRESS;
    case STEPS.PHONE_SCREEN:
      return STATUSES.IN_PROGRESS;
    case STEPS.SALARY_NEGOTIATION:
      return STATUSES.IN_PROGRESS;
    case STEPS.OFFER:
      return STATUSES.OFFER;
    case STEPS.ENDED:
      return STATUSES.ENDED;
  }
};
