export class SiteSchedule {
  id: string;
  site;

  intervalBetweenSiteDownload: string;
  intervalBetweenPageDownload: string;
  maxTimeLimitForSiteDownload: string;
  maxDepthLevelLimitForSiteDownload: string;
  useUserAgentFromRobotsTxt: string;
  followNoFollowLinks: string;
  checkExternalLinksFor404: string;

  active: boolean = true;
  createdBy: null | string;
  modifiedBy: null | string;
  createdAt: null | string;
  modifiedAt: null | string;
}