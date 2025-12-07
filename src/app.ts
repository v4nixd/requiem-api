import Fastify, { FastifyError } from "fastify";
import {
  ZodTypeProvider,
  validatorCompiler,
  serializerCompiler,
} from "fastify-type-provider-zod";
import { ZodError } from "zod";
import { logsRoutes } from "./modules/logs/logs.routes";
import { usersRoutes } from "./modules/users/users.routes";

export async function buildApp() {
  const app = Fastify({ logger: true }).withTypeProvider<ZodTypeProvider>();

  app.setErrorHandler((error, req, reply) => {
    console.error("ERROR:", error);

    if (!error || typeof error !== "object") {
      return reply.code(500).send({
        status: "error",
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong",
      });
    }

    if ("code" in error && typeof error.code === "string") {
      if (error.code === "P2002") {
        return reply.code(409).send({
          status: "error",
          code: "UNIQUE_CONSTRAINT",
          message: "Unique constraint failed",
        });
      }

      if (error.code === "P2003") {
        return reply.code(400).send({
          status: "error",
          code: "FOREIGN_KEY_FAILED",
          message: "A referenced record does not exist",
        });
      }
    }

    if (error instanceof ZodError) {
      return reply.code(400).send({
        status: "error",
        code: "VALIDATION_ERROR",
        message: error.issues,
      });
    }

    const fastifyError = error as Partial<FastifyError>;
    if (fastifyError.validation && typeof fastifyError.message === "string") {
      return reply.code(400).send({
        status: "error",
        code: "VALIDATION_ERROR",
        message: fastifyError.message,
      });
    }

    return reply.code(500).send({
      status: "error",
      code: "INTERNAL_SERVER_ERROR",
      message: "Something went wrong",
    });
  });

  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  app.register(logsRoutes);
  app.register(usersRoutes);

  return app;
}
