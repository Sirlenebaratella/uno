import express from "express";

export const isAuthorized = (...cargosPermitidos: string[]) => {
  return (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    if (!req.body.permissoes) return res.sendStatus(401);

    const result = req.body.permissoes.some((permissao: string) =>
      cargosPermitidos.includes(permissao)
    );

    if (!result)
      return res
        .status(403)
        .json("Usuário não autorizado a efetuar essa ação!");

    next();
  };
};
