import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { AbstractBackendService } from "../../../../../commons/abstract-backend-service/abstract-backend.service";
import {
  GlobalProcessBackendResponse
} from "../../../../../commons/common-components/global-processes-browser/model/global-process-backend-response";
import {
  UniversalBrowserActionResult
} from "../../../../../commons/universal-browser/model/universal-browser-action-result";
import { AgentDto } from "../model/agent-dto";
import {
  ActiveEnvironmentManager
} from "../../../../../commons/common-components/active-environment-manager/active-environment-manager.service";

@Injectable({
  providedIn: 'root'
})
export class AgentsService extends AbstractBackendService {

  constructor(http: HttpClient,
              private environmentManager: ActiveEnvironmentManager) {
    super(http);
  }

  protected getBaseUrl(): string {
    return '/puppet/agents';
  }

  updateAgent(agent: string): Observable<GlobalProcessBackendResponse> {
    return this.http.get<GlobalProcessBackendResponse>(this.getApiUrl() + '/updateAgent', { params: { agent: agent } });
  }

  getAgentWithClasses(agent: string): Observable<AgentDto> {
    return this.http.get<AgentDto>(this.getApiUrl() + '/getAgentWithClasses', { params: { agent: agent, environment: this.environmentManager.activeEnvironment } });
  }

  updateAgentsClassesManifest(agent: AgentDto): Observable<UniversalBrowserActionResult> {
    agent.environment = this.environmentManager.activeEnvironment;
    return this.http.post<UniversalBrowserActionResult>(this.getApiUrl() + '/updateAgentsClassesManifest', agent);
  }
}
