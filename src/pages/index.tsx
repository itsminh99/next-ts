import React, { memo } from "react";
import { Text } from "components/shared";
import { AppHead } from "components";
import { NS_HOME } from "constant";
import { useTranslation } from "react-i18next";
import { Stack } from "@mui/material";

const Home = () => {
  const { t } = useTranslation(NS_HOME);

  return (
    <Stack flex={1} height="100vh" justifyContent="center" alignItems="center">
      <AppHead title={t("SiteTitle")} description={t("SiteDescription")} />
      <Text textAlign="center" variant="h3" color="error.light">
        NextJS App
      </Text>
    </Stack>
  );
};

export default memo(Home);
