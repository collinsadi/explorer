import { lazy, Suspense } from "react";
import AddressPage from "../pages/Address";

const Home = lazy(() => import("../pages/Home"));
const BlockList = lazy(() => import("../pages/BlockList"));
const Transactions = lazy(() => import("../pages/Transactions"));
const Block = lazy(() => import("../pages/Block"));
const Transaction = lazy(() => import("../pages/Transaction"));
const VerifyContract = lazy(() => import("../pages/VerifyContract"));
const Tokens = lazy(() => import("../pages/Tokens"));
const NFTTokens = lazy(() => import("../pages/NFTTokens"));

const routes = [
  {
    path: "/",
    component: (
      <Suspense fallback={<div>Loading Home...</div>}>
        <Home />
      </Suspense>
    ),
  },
  {
    path: "/block-list",
    component: (
      <Suspense fallback={<div>Loading Block List...</div>}>
        <BlockList />
      </Suspense>
    ),
  },
  {
    path: "/block/:id",
    component: (
      <Suspense fallback={<div>Loading Block...</div>}>
        <Block />
      </Suspense>
    ),
  },
  {
    path: "/txs",
    component: (
      <Suspense fallback={<div>Loading Transactions...</div>}>
        <Transactions />
      </Suspense>
    ),
  },
  {
    path: "/tx/:hash",
    component: (
      <Suspense fallback={<div>Loading Transaction...</div>}>
        <Transaction />
      </Suspense>
    ),
  },
  {
    path: "/address/:address",
    component: (
      <Suspense fallback={<div>Loading Address...</div>}>
        <AddressPage />
      </Suspense>
    ),
  },
  {
    path: "/verify-contract/:address",
    component: (
      <Suspense fallback={<div>Loading VerifyContract...</div>}>
        <VerifyContract />
      </Suspense>
    ),
  },
  {
    path: "/tokens",
    component: (
      <Suspense fallback={<div>Loading VerifyContract...</div>}>
        <Tokens />
      </Suspense>
    ),
  },
  {
    path: "/nfts",
    component: (
      <Suspense fallback={<div>Loading VerifyContract...</div>}>
        <NFTTokens />
      </Suspense>
    ),
  },
];

export default routes;
