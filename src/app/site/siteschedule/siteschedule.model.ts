import {Site} from '../site/site.model';
export class SiteSchedule {
  id: string;
  active: boolean = true;
  createdBy: null | string;
  modifiedBy: null | string;
  createdAt: null | string;
  modifiedAt: null | string;

  site: Site;
  intervalBetweenSiteDownload: string;
  intervalBetweenPageDownload: string;
  maxTimeLimitForSiteDownload: string;
  maxDepthLevelLimitForSiteDownload: string;
  useUserAgentFromRobotsTxt: string;
  followNoFollowLinks: string;
  checkExternalLinksFor404: string;
}