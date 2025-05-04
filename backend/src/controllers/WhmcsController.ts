import { Request, Response } from "express";
import * as Yup from "yup";
// import { getIO } from "../libs/socket";
import authConfig from "../config/auth";
import AppError from "../errors/AppError";
import Company from "../models/Company";

import { verify } from "jsonwebtoken";
import User from "../models/User";
import CreateCompanyService from "../services/CompanyService/CreateCompanyService";
import DeleteCompanyService from "../services/CompanyService/DeleteCompanyService";
import FindAllCompaniesService from "../services/CompanyService/FindAllCompaniesService";
import ListCompaniesPlanService from "../services/CompanyService/ListCompaniesPlanService";
import ListCompaniesService from "../services/CompanyService/ListCompaniesService";
import ShowCompanyService from "../services/CompanyService/ShowCompanyService";
import ShowPlanCompanyService from "../services/CompanyService/ShowPlanCompanyService";
import UpdateCompanyService from "../services/CompanyService/UpdateCompanyService";
import UpdateSchedulesService from "../services/CompanyService/UpdateSchedulesService";
import Plan from "../models/Plan";
import moment from "moment";

// type IndexQuery = {
//   searchParam: string;
//   pageNumber: string;
// };

// interface TokenPayload {
//   id: string;
//   username: string;
//   profile: string;
//   companyId: number;
//   iat: number;
//   exp: number;
// }

// type CompanyData = {
//   name: string;
//   id?: number;
//   phone?: string;
//   email?: string;
//   status?: boolean;
//   planId?: number;
//   campaignsEnabled?: boolean;
//   dueDate?: string;
//   recurrence?: string;
// };

interface TeamConnectProvisioningPayload {
  serviceId: number;         // ID do serviço no WHMCS
  clientId: number;          // ID do cliente no WHMCS
  clientEmail: string;       // E-mail do cliente
  clientName: string;        // Nome completo do cliente
  plan: 'basic' | 'professional' | 'enterprise' | 'platinum' | 'custom';
  usuarios: number;          // Quantidade de usuários permitidos
  numeros: number;           // Quantidade de números WhatsApp
  integracaoTypeBot: boolean;// Se tem integração com TypeBot
  suporte: 'básico' | 'premium'; // Tipo de suporte
}


export const create = async (req: Request, res: Response): Promise<Response> => {
  const newCompany: TeamConnectProvisioningPayload = req.body;

  const plan = await Plan.findOne({
    where: {
      name: newCompany.plan
    }
  });

  if (!plan) {
    throw new AppError("ERR_COMPANY_PLAN_NOT_FOUND");
  }

  const company = await CreateCompanyService({
    name: newCompany.clientName,
    email: newCompany.clientEmail,
    planId: plan.id,
    dueDate: moment(new Date(2099, 0, 1)).format("YYYY-MM-DD"),
    whmcsId: newCompany.clientId+'',
  });

  return res.status(200).json(company);
};


// export const update = async (
//   req: Request,
//   res: Response
// ): Promise<Response> => {
//   const companyData: CompanyData = req.body;

//   const schema = Yup.object().shape({
//     name: Yup.string()
//   });

//   try {
//     await schema.validate(companyData);
//   } catch (err: any) {
//     throw new AppError(err.message);
//   }

//   const { id } = req.params;

//   const company = await UpdateCompanyService({ id, ...companyData });

  // return res.status(200).json(company);
// };


export const suspend = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const data: TeamConnectProvisioningPayload = req.body;

  let comp = await Company.findOne({
    where: {
      whmcsId: data.serviceId
    }
  });
  if (!comp) {
    throw new AppError("ERR_COMPANY_NOT_FOUND");
  }

  comp.dueDate = moment(new Date(2000, 0, 1)).format("YYYY-MM-DD");

  comp = await comp.save();

  return res.status(200).json(comp);
};

export const unsuspend = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const data: TeamConnectProvisioningPayload = req.body;

  let comp = await Company.findOne({
    where: {
      whmcsId: data.serviceId
    }
  });
  if (!comp) {
    throw new AppError("ERR_COMPANY_NOT_FOUND");
  }

  comp.dueDate = moment(new Date(2099, 0, 1)).format("YYYY-MM-DD");

  comp = await comp.save();

  return res.status(200).json(comp);
};