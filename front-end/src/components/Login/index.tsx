import {
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { Formik, Field, FormikHelpers } from "formik";
import { isValidEmail } from "@brazilian-utils/brazilian-utils";
import { useCookies } from "react-cookie";
import { loggerService } from "../../services/logger-service";
import { AUTH_TOKEN_COOKIE } from "../../constants/cookies";
import { addDaysToCurrentDate } from "../../utils/DateUtils";
import { apiService } from "../../services/api-service";

interface FormData {
  email: string;
  password: string;
}

export const Login = () => {
  const [, setCookies] = useCookies();
  const toast = useToast();

  const formValidate = (data: FormData) => {
    const errors: Partial<FormData> = {};

    if (!data.email || !isValidEmail(data.email)) {
      errors.email = "Insira um e-mail válido";
    }

    return errors;
  };

  const handleForgetPasswordOnClick = () => {
    //todo: fluxo de reset de senha
  };

  const handleOnSubmit = (
    values: FormData,
    helpers: FormikHelpers<FormData>
  ) => {
    apiService
      .signIn(values)
      .then(
        (data) => {
          setCookies(AUTH_TOKEN_COOKIE, data.access_token, {
            expires: addDaysToCurrentDate(data.expires_in_days),
          });
        },
        () => {
          toast({
            status: "error",
            description: "Não foi possível realizar o login",
            isClosable: true,
            duration: 9000,
          });
        }
      )
      .catch((error) => loggerService.log(error))
      .finally(() => helpers.setSubmitting(false));
  };

  return (
    <Box as="main" width={300} mx="auto" mt="200px" display="flex">
      <Box alignSelf="center">
        <Text fontSize="4xl">Bem vindo</Text>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(values, helpers) => handleOnSubmit(values, helpers)}
          validate={(data) => formValidate(data)}
        >
          {({ handleSubmit, errors, touched, isSubmitting }) => (
            <form onSubmit={handleSubmit}>
              <FormControl isInvalid={!!errors.email && touched.email}>
                <FormLabel width="100%">
                  Email:
                  <Field as={Input} type="email" id="email" name="email" />
                </FormLabel>
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.password && touched.password}>
                <FormLabel width="100%">
                  Senha:
                  <Field
                    as={Input}
                    type="password"
                    id="password"
                    name="password"
                  />
                </FormLabel>
                <FormErrorMessage>{errors.password}</FormErrorMessage>
              </FormControl>

              <Button
                variant="link"
                alignSelf="flex-start"
                onClick={handleForgetPasswordOnClick}
                mb={2}
              >
                Esqueci minha senha
              </Button>
              <Button
                type="submit"
                width="100%"
                backgroundColor="primary.300"
                color="white"
                _hover={{
                  bgColor: "primary.100",
                }}
                isLoading={isSubmitting}
              >
                Entrar
              </Button>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};
