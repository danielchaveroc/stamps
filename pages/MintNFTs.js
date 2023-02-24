import styles from "../styles/Home.module.css";
import { useMetaplex } from "./useMetaplex";
import { useState, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { getMerkleProof } from '@metaplex-foundation/js';

const DEFAULT_GUARD_NAME = null;
export const MintNFTs = ({ onClusterChange }) => {
  const allowList = [
    {
      groupName: "OG",
      wallets: [
        "6vPSfwbAv3rjpQBNjTkykYMaRKzFBKbmMq3RrCvcWTa8",
        "5YPSJgz8S3UiqvtCxi5gGirffCH7AF7uZKHxKD9JTroZ",
        "9EieZdHow7Kf4d9QcSbRJs67uiLLJxdZFR9C6Pf2ived",
        "9YDS7QQ4QyuqSTPsK4GfGAHde6CfSRMX4MF82sZsFAuR",
        "9fxwmyNGAmAx9suvmUiAw6Lmqwu6ReEr4a8EdroknUpR",
        "8uP9No3Bxyu3CeUCFZzbwk3dGaxG5J5esKRY4EH6dNJj",
        "Bxwwbf4cues1b4fYo99jfdoDrmyAmnVTP44DgaSp4Ss2",
        "Dzwd3arZLiJMNZHMkftMqVHT35nLagem9HgRFaMztNk7",
        "D8oTF4TWmmNY5gfSGAA5LtX4PHedtXtCAjJqAxPx5P3F",
        "G9ZPZKESKCWDNeVbGw72yjmStHwBcZLAstZJ4EFrYpxN",
        "2vAU1WXEmJ5JczgfTrWgsUVkFQsR3iT9HJCgFmcC2GSb",
        "DTu5oUyfjn9P86wi8BSs7DVajLW9MZMnGKTs1ZqVxiUA",
        "48RDMWvX8PahfVKWCexckuV9FzeHzZkzHHQ5M5ZB5r4q",
        "EX3oC42CSYhdTZxj5mYQcAcqh3unZLo1D7phJUEtb8Bv",
        "EwJ3G6FL6Je99YbStehtao1yg1XjURZwRuVbJFSTJgRh",
        "Fitz9JHqfD3NT9FUqiN1kh31M7gYKTshRBcawq6gjDS1",
        "Eg87kxRSnnVWRyLUMBx9opx9oC1CeMDZDQujbtvdERua",
        "F4bKdxAKV65etG5fecfPRyB6mttHexVu62n8RYjwpD8u",
        "HWmfwturjcNy5iZ1dZNXkQitynfstNyR3ro3nTLciJA1",
        "AEMVHxE7NZBorRYEPLNagQhzfuJSMRte6J493Vkr2Kge",
        "4UfWte7vJbuoEKKhYAqqZBoAdtN8YZNVzVAXffDHNPRk",
        "DJYJFV8Z4MLZ4HqLNkRpop8N4kTas8xScgmRGHJdFbkP",
        "9Cniy7jWTe3Ae7NjP8phv5dfXzvnJgyfComWkYmWfxNX",
        "DE26VQdfarHtgjPWNFYKmhToqRHHTUD4HSPuQJKjUhDh",
        "CSJ4LjNv5cPufN4rgXzrN4XavyRrvVJhEDsffaDWjLwm",
        "8mUZEZ4YDs9VgUH2hnXcEupxaY9TcakGvcVHNoJELoGK",
        "DL8dHZ5Tq374yYVEeMfdN7NgWgHxQLB3gdTVf6p3Y3X2",
        "CagZkhkdN95aW3h1TVWPWhHbKMsKYwcMqxk1h2z4P9Fs",
        "5VQj9yLRBG85iK5UPk5MCoXoM3wxVtTt5j71SVQKu8TY",
        "6wqefTJbEBnTZuS9dpkbXv6JBjvfpn7EVFyz2pSBfsCQ",
        "Bc1iRyooFtfNFbrHNj95qu9ozsviNyWtHEVdwJxqwvQS",
        "3wEzGeFfBJuZNFSUuWpyxBkRZirVAWM6b3o5uQR7DXsX",
        "B2Ht6z8B3965KMg76PUJnQfVyRS4CbWizegDSfWfVXUw",
        "1r2uqtmSZbiTbcELuiQBk4JdVBLW4wPNAac7ACn7xBM",
        "AGRjQvgkGg8UStN6twZugn8w5YJ7p4GvettLXjm4cSer",
        "FFXgCJP9iMz1BBd7rPd4oAjPviN2rTcNqBjh2YNAw2Xa",
        "4SN5LruWwdpW6xjfma1qCpF4Z83BkSinqq4JEEfzBcCo",
        "HAf1UdGWvDaifSgYZyYR5QXPbqjqdB1pyTUAsp7vyZFh",
        "99ju2NwMCzXHegyLXnXE2eGuy2QgcKMnKr3U7nmvX6kK",
        "BmUSzx8tyaKvFqN7eKP1bc2NoGC9fovXgT93JbtcxPGo",
        "6gk2QrmdUevhpV6frEEm6htxzoKDjczJWt81Z88DrXf1",
        "8GfHsHJVK2rkXqABPgK7XVu9rhyMrwSQ4VSQBc26q6WK",
        "AgCuxobkF2BTw2xc1X3qVviHyd3FYmsrtDBx7wF6oiMS",
        "F957QcNkJXT7Fbm6BcWvmEj9HqSMBc2uHUM51poX841S",
        "J4mmk7qVBA1wvg1rHv7BCxzhG3ehN9mAH7noxqRAyPd4",
        "BdZYTXJhyCJ1C8PL4SCJUbVG21uPPBB9FLgSdymZ2qu3",
        "4aavG5sBvo2joqyzAsj5kmp6dQe7csCPm4ESeBEEHPq7",
        "3VQHM9dvxscioQMhpn9rbDZf4xqXAt5Buq7y98X4PJeS",
        "9VhoDdDaK9vygDiEnoi8y64XJAz97vgF3TkGXqiHXBHu",
        "A7Bsib3WVoE8vqeZpPCgpN3KtzpViUU7smzZXKfitGz7",
        "82X2CGye2un7bHvhvGPSt7nSeyQyFfKh7r4Uq1ChJoc8",
        "4D16raNebnBkS6MmxNc411FumiaaywucpFGvogQQPfK7",
        "4ZLKW5PpNkKHLJro7vdgHb4SpAq17SxtZVgAx4hu8h7W",
        "8BpMY2ntDxF6PbCjhQqr1iVtSejD2CyiqPQxkzCUFzXc",
        "3jXmjZKksqwiTdGji1HNZwwgbfQodSn3vQ3PnyzyxPix",
        "8n11432mfMbc5gL3jA78wTfzPALaafMhfUeP5yVuU75M",
        "8hhgsEmVadH51shFWgCcehWFENwTHog99wWDxTMkyaMH",
        "2hRKAtc1gxUaVnDCwW5f57QqdW62zZJE4SL4Mf5C6kf2",
        "6jgWZHDi8fizfWNZXi5pZxugeS8caeEWvXnqZwinkYDb",
        "HYRa7iTGHfkzrvMEZpa4Z2qXtAPTwqckw2JJAJxf4qSu",
        "5eLby5AR3SuAVomd8b7yA37pLyB983ps2kewvhrMmNMu",
        "E9njqdcgKLyyGgcGtTYSZtKxRooDjDaqCkd8BLiA9kh3",
        "CvE83KaWSoaDPFREAHEBMkSetM7Z9VcrC2zg3ps6tdRo",
        "62JMRHqPYUGGKNibfsfWNvptcZoG921PiShBofLbFfp9",
        "26e3xTXQyak34pjwLX16go8uFdYZn4z259n1GtM7azN5",
        "8fSKAXiaPFqu2T68dp1KiuiztkGfBTVD4vo86JqZ9k4i",
        "RsdJneNYby5dJsyw6GJ279iFs5rDshkFjdtY76F2jGe",
        "HaeMQwnfUUv8GhFYXzBBM1Ce4Lb2pEBtE6xzDAkV5cug",
        "FNmfWgCV9urobr5ht9BP7bhQQpmbadNwFVhkayB6Hrsi",
        "7qqH2DArViNSZ4wfCjPyfdP1iTv98Z4LpDvCDwFkYRMe",
        "C4wTdMGgrtzrqMCGEsMvmWdAGWhs89ByhTceh1CvjX2Y",
        "4bC24xsKyy7YY3LUEU1tAa8UdF2qQo3yJ7pKtoeSZSRx",
        "2gMtYFGb2MvdJ3SkTChEhXMqmb2r61KD6JjWRJHxRWgf",
        "BHAx4jbJRrPfwLFiPZYHGyCKjdHm66F13jzim79XTEJp",
        "BJhxs9SeAE5gzWrMRcubW1pipggT5MXoJ4gN9x5TvAXa",
        "GQCn9jdCB4MfUYqbVvrpCuBGwX3hiQxADKmDMe5VnRwA",
        "2UARpZ7d3qTpArXz8ELmVgDxqCMTV1NYeGePN2L9YvLS",
        "CwvHTbTMomBWRC5tb1oX4yE8YC4nJw2vfzZj2HqD3YEd",
        "FLrqRERxbv48g387SkCCWmKN4u8sKWgan8eqoVQ5yLxZ",
        "HEvEj2gALttNm7o5odwzzWw3oADT9iWC1imo4kR1TgfB",
        "5627nmUBAdepGrQEVGtKrNA6WLAsj6Umz3yyyNYAoZC5",
        "2FhntCKsJq6QAWZsfZzzyMGA3LkBTfgK7SkRe97c1d1w",
        "38ur458dukfJ6xDbA5Z72A4n5YmurHiWrwxyoQfHZQih",
        "2zpt2P12L2XJa49asX6p77nJvtRRxb9hW9L2Db8vbVXj",
        "A1j9mgK8WZwAwNpjN9N6R24pZyJ1MScgR2DvqLBWHhsh",
        "5EFWaeZ5pEuEpduxyd9uMK4fQv2qJzoHsxAdCW5WQDDV",
        "3Ryv6a6yeouvKixa2DxNFcGyRb54KvgeWk9EC4exCeEk",
        "31khAk7dCdgfsYzvT3gsCEn2XXMfTETmYPwwMfSZMd64",
        "F7RZFecAHS2sCg7BAmQi6QttGDF8ngLkyU34TCEXdKDt",
        "4kRK2XxEtzU6sK4KGEVNhCVpeBTwHsKUp9QQFaUJ6rVw",
        "6czqX34NT8tqFndvj8P4Xomn1UmrqVbKbjfE9UsRT2MG",
        "5uRHvH79fX1NE4GhZotFts6rBbWjgevsLTLsMju4PWVU",
        "968vLC7mQGVGbwfUdq5CzX4AjdgVprRRCZG3pbDcEmCx",
        "ErsoQf5tcXrLM5d4HfumuJWf4fTikZAfSN3YyRq6NY4d",
        "7gedPdH9rBvNPQTnK8mspx85rv2b5waK7Cm2ESZBy6uv",
        "7E5QC5zmd6gTV98F8qvYrtTLnJxwSz2gVyJmZdwxp2Bw",
        "BTcz5WkGWpARCU2vqqw8GmeJZPFr9azcJANuwrvq9bpS",
        "5CWjBf3yd1d2ZZ4BQ6atss6zeaoHCUpkfg1ewjQ4z7Uw",
        "D3bdtYPSLRaGeZ3q57kv3EM2oXjW4XzVG86Xd8cvprTk",
        "ApUwaLzeNrAoCKKo21ii7z4HsNdZJMzLzNzr89VoekDo",
        "ErCQJzmE5stX9zgGgpsnX9mSrsFpEP7FcWCtxZQPt1eU",
        "7NXeN9qRhcW32udTUqViLg6s49nMY722kBidwEgHQvdg",
        "CHGZPpHeQgkocY2Br9fbQvaaFyAyCyy82kirepqpJc36",
        "9g3qmd34M5uouZvbTWAeQtp7dNNzBtCxU7k5VqiaDwss",
        "45uP6SrPUTn5XzNNak1YJXaM42Wb5xbQTrEc7kX5L5vU",
        "39kE7pubVg2wM2RQk742k8czqC1qwuXYx4QKW2dEQxtE",
        "JSmH43cu1HAHv2d1ut3P4LnzweHSAdVedWvaCGoc2hU",
        "8y2mjZjD2ueZZNovW7QjskEaQUfDLgA6eUvurAJoqKRq",
        "N6EpbpezknqfZavk4Q67uHEAYU5QhVua6J8DffzaPpb",
        "J4wrv4UEjMrBACZHzeLwRUeDz7LNG3iC8uA3ytRBxuH1",
        "AQ5C2AosaPqr69RhgGoAkhWpLjeWGsNQXhkMMfYAz47V",
        "29ZPHtCr4tcQkCWgQxdnvXZjKnydtjDt4GigiZSmTcaW",
        "D3jJAXFiDt4DnuTZv3ogvgfDLgmh9caGKDiFgsErt7r8",
        "9FGhbM3sVAUd77Y68D561s5FXnTWXeLghhrHbvqqZbtF",
        "BK9RUDj5wWRcL7YsExVMUtm8tXGEPRqXFewNsN2HuLQv",
        "GrSM7nqsG6S8i5mex9oJiVcAbDRNATJuxoeC3mPMKgpo",
        "xngaDk4yvhdf6XxMVRCpZ7L72mzuCS32SedLc7ffrLk",
        "413UGdeVRRpMbwM9LUdXQ8twHgPbbLCHZaqStQgueeTS",
        "5hYUkdLLvSDHU2HuatNPTsweALSusE6DHcKtNUEbMfW6",
        "33TwyfbUrF5GpfPE8Et3KS3uMJMDn6XRbkVYJaDn2Avo",
        "WQokEfP6WhuToHSDyacFLQRKsrX2kd7GZaHvq4GYWY2",
        "84mdDxPckLHRZ4TK71xPDP4Cc6GtF7MyCf7PyTs67TLJ",
        "GNfErVBfnE9jGUCJeMb4KqpHA5q9cSqQ9iVbUQdErMXC",
        "EyBxpZnkqSzPXgsY5JzyCW9FJZjGbCDjN3acguZE6zzB",
        "5sM4v2mtqcV2puBrPAT64S92aHztRtDd2mcZjEKRjXiC",
        "EWCXJE845jxq7uxpXEsjFdLGvkxz3pSPmPtsRA5ukUY7",
        "8EMsZqUFtFNUemibqzvFq1sujkrngqETABFYoPgHzV1b",
        "FqhSx5maniacAc4p4ohwrYp5n8WmZe9swxKy9rAT2941",
        "7VS2iwhaVLZoY2jM8yqiefYXUGGt5vL3nTqPrn87GLf9",
        "DaMu23Z2Qc58Y4XqoM43kGhJtC7hR55oS6y5vwhcM71z",
        "3fLCxP18KQ4J7dTNk6LXsqWBQyEVQuCnFk7JXyZH7R7t",
        "ErtHkd29N5yGAJT3pYTYVFcb9yt2k7A9ufbs2rhzTzKK",
        "8GMRh7kPo52fNTtwKafgneTNL7u3iGRkQFZYNVHo1Xbn",
        "8BzBCQnEhvX36vdUuYb4QrEBWDCJvG5UXC9QAqxThZE7",
        "6b65Nz25xa8MuF1YLdWqG5Z3uVw8acSqfke5kCQ9TjEA",
        "AzBjMQjMFAK3vUnadGbvxuDtiT3VHz4KjgZTAkJoUgyN",
        "CBVMPZz94397ePyKo1XNDg29zNeB8vjLiFmtEeyHuEAy",
        "DA6JFn2censm8GqYtrnRiBdTH42B1RRBUhrDX2Lxjuvs",
        "DF1zAe1wGwY8hpd58qihfgKiNjirfVMK3Hj7sGM7kPcS",
        "twT9F31KYwWoCKJekKZrhk15RsUguHiqFDvXnfMKzBu",
        "6hNti7xXwp2Ui6WpddbNdEmcY3gpZ3P31c3jBghkfxY",
        "N3pqLJL5fH9k68mD1Kmj2bMoFijZ9V17BHoqs9rkQZb",
        "8QnkCzvhfZaGNfU2DLPMVgaFEEqJcz5RqKUticRbT7fn",
        "3WDp15iL3DG9Bmgiax6zb3P5LHJGBHVHBdGehigVxau2",
        "6Y9shYCb7iE4DgNwYkpV8JovyjkcKuHk9rpHXKNiqBRr",
        "3NvL7SEmp1HpGSHdB7HMwVT3hGxXYrH58sH5BRBvdCDZ",
        "8A2J5RZiAxnHxEN6cykTw6xvHo5RrJi8hFHJ5i8nmMcr",
        "8iVH7uyRE5sBCC5i1CtpKpxSjCfHUZXoEDtJ5HsymDGF",
        "7SZyE7dv1XbSQr9FCRVC2zrsLJczcNESNzPKc6Fr2Y1N",
        "ArNz3ypbek3vJWt43qtFAvxaLLFXJ8An1867dRoLtzA4",
        "F1xeNgt6tRfiasT4oUMYebsoyKYGndRMrL84485c6Tt5",
        "DMSn24tJHGc7XrQbWcERZVfN8zHRDsj6QyXNLYn2LTkT",
        "HhRMJPLAKeo2aUuScvEwNGuMJSwsyMiAgKpiAhn7qSgy",
        "CmUk2HW5aW53233PdMyruyidtZzhHvBqGCiraau9BksF",
        "6aUfQbWzAfo3E3GMXY81Ru5x9uHyeshhStXDs5HEWW5z",
        "7vJWbTveiBJq4iar2XZWTWPwuA1j17kv8hZd6R2ePbtt",
        "M386bVnMHigTRFNG4SJ6BWektbXdb5RdvGpVnazsp4a",
        "5D3ybP6drxRbKeZPbMbUnPt8vT7FJ2feC4QiJ94m8fJC",
        "3bBzakqTbH9Sfo1rTujS6fpEZjCKjALEpzmEAgnTCBMF",
        "eVCqyc5pG1T8iYzuhZiwbMGyAQcfKxZVVHRjoCyuWz6",
        "5xFxjNUH2MaExGdQosKZwnVgFx5Fg3UBABYNNBSrekiR",
        "D97VR7ds8U23pdWCn9AKkPMq1g6bjo8eEShfQxe3LLe9",
        "2yn9y5na3VKpq4iUNGU56mnD5dkn7vHjydNmxVepEW91",
        "2LEBqLXgqSKDRXrgseiBsg4e7Qp54ADA4d5E38CniGoo",
        "DMXFgQSNpi8V7qkZuVuZ2YGBXmdDvZbuX14X1ikrnzsb",
        "4erznN26qLKWGowvjKbKkgTTBXNRAHchjCustxGwKcbJ",
        "D6dpCvTa4q54e2xr8HBVb5ZgG2VMK9dNUhUw1J3xHnFy",
        "BNtL6d4s12bb67UD4e6MJmFts8BBhsETEAXN2et7m7S5",
        "3GV6XpU6zuu3EzByqp7V3arFGA494tyokT1EjWXepmnU",
        "251bqjvDM87FcPUmDcSEXoVfij6XeeRKD9ZZxLEard8H",
        "612nucukm7RBiRYCATqv7rwBTKFyibJyq9JASZ2Y3tnp",
        "CEFBizk2oinfpW8RAKZq3M8NHp9bVqPT7iSdZ14n1jLy",
        "HjPREefdN7ufebQYKP1PtyguVdcm85tMxd3oaKBt4sXc",
        "2bjvi8gcnoAQxN9fE37uBFu8A5oxHdQyYgBx1FMNQhRM",
        "ErQG6RAHjC3UgcwdFHnT4YCFBK7rbuYhR2Ta7CA2SAcB",
        "AfJSjwaPvxQZbpW1K2XGYyH14bUgcZCyvPLfGPrBNbAS",
        "58pGUQdxRZdYUe7x1UjDBvjUpAayTQpjpkR2y28hM2xj",
        "9sfc6BCnFUQcP38DfY1stPPvryjad42eo7G1DFKmavMq",
        "CdLC16FmWiVoPR6Xt416kbQ5zWhu3ibLcvECEEMfwecX",
        "4dxoiSzz7As8swAwgRkbbY4TXDzHqPTC8GRHEcNpeAR7",
        "DAxQpzaVXuCPqrLs9jtcxNiW8nwsKuv6uZP15vGFFB7n",
        "342tqFCDTtDJXnrTd72H6TMwJGvsr4PveZLpmqxEJb24",
        "2oBP4pGyYir46nFCVNdpuvdEhXXuBabxSw9C2kgqiUzU",
        "GthicZ7UnffiUgqp2oWtnY4MnjXyYyCK7qetrGRkxV9p",
        "8XG2BFfAdC2fpVuHLVJaYDTyCHqaGUfTBAT3BtKNTESf",
        "fWM6C4n7XPa1ASFSEz6Rjp7icj3wPMut8Q5nc4d3ws3",
        "BbVUh4xPmBdnhkJvDLmhKKWqsqjV4GgyKa7nQdbawZtT",
        "EkSmM5cRuqBd4Wci5AvnUDvJMAovbDJdY9kyGDZBEGpq",
        "HzukfVz8CT3NE1APRfMaBs73bqDPz3EPCvRaK6tGhx8Y",
        "4m8Hz1bQLfyhgZjsCtBA3z6NcQyjn97GfaUbXMsj2fpU",
        "5bLvHa8i1RBSC3DRG7iJ7yq3hwbG8AZ7CGNcYd7oqvA1",
        "CgQxgMWFp6Q5DXn9PMNpLy4Rnme7xxrW3cwM4VZSKnbV",
        "2KArofRpFCAyBQhjJcD6LKp5nLebrvZikRKhVV1JewVq",
        "sHfwiZzH5r9CRtxbw29L1ePxG485zuc4Eui98geuNf1",
        "JCenBGfTLrJVN3tp84sos8fHqagDvFzi1djs9e59M4mP",
        "2gJzGFrQHTywj374YHjnKsHdSZxPZY5442QmvFroVWXB",
        "6bwLuKTzLT6usCPZmCwSQu4QRFjNbdVqSN6UTF48QYEz",
        "23wPUKNpy4jDCQDK2hPeDqXbJDZwEYKC22pb5fJwaMxp",
        "7okf8rBmNFsp9VFXiYGMwuMXGvrX7NmPjVsVJdJkoGs3",
        "AFL6E5c8gppxTT8wAADPYKoR2qGzeDznUUUbpWp56GMj",
        "3LEDNN45HBcFyZphH82fsgYCZYz3iZro5x4yNRwmJ4Qn",
        "7HVLeXsaSPF9dRUDKWaSRs11zmdiGqAkM2Mf5duXCxs2",
        "1LBN9ZqZ2wnTny278JYuE6ZTvjiNgKx3F3w8xamnyQ2",
        "Ec7fbCDXDnM5or7ZSP19roqcNf2vSt362JZQ2iuQqRX",
        "FpTvYkKadTb6Lk5wzxCxc1D5cSMTCvX3CwvNkYPSp178",
        "5JHbZDJfBxcHuUviDnFL9s1jPDxmJJT1V6rvzXiyFDbo",
        "BHAhzioQugJhCauUw3VCQ72sy3SH2ZzcmHqvpyCskdrH",
        "31U5pMH9aPTZivjfnkPsMZWwdjj2bVQT4NnV6czXdFYB",
        "6HiWiy692waYorRhqXcvKMskkAPvQWQxy57hWYEyMREU",
        "DeQtLMKncdpC67rpB3VFqEvi1mtC1q9QJgACumzonFhP",
        "77XupHRsggQVX5obPGJvVv8cG8SF2wQSZXDzKiV94yxd",
        "7Yq9drFupwT97QWJrYYKREgH7DAcf24nSZfT1C8pNc4R",
        "AJPtwFUzqWfV8z1NXSva3uEX2RDQS7qAAYgpzLofa3RE",
        "5noti4wfamjNLWF3EvVcNvhznrDXFAehxrvXxcXTMzRN",
        "2uG9XRFT9cJfyrHToFCraCYtFHadCwkT1puMdcLbQayo",
        "EazkpStbgYpGAtnuQxTLMbwj8A1w8smTg7i9g8MJRXjV",
        "9HDj55riyFSijcK8958rgKQYcaNfJfYGNHLU1zAbyef5",
        "az63Nmr3naiumbNc9ceBEUFCRNZqvY2nDd9Ruk8S5y9",
        "EZEW12dpmGGqifFKoiwuVSUsKZJmZeAgxqFrCmvMTSHG",
        "4MKzSXbTU151aQhhaju6p5ifLoYPsi45TFpqfZwg5AGR",
        "Cb556ed9p5XNJk3pLPriZmWfenbM1rAij3Qto3M6Xn8F",
        "9c6k8GtTydt55NkFmSmX5gNuXjmKHHqqSjWFcmrJvUhQ",
        "CbtQo4d6VNsAomPhT4SaaqthZ2HjZaQ2pbUvt3kzBieN",
        "AKhM1dwQD911xWZZBNVc82PFveL7zPXHZrWfMBhcGjHm",
        "HAqGQ8y5jTQg4MDjAQKRHT3rJDoNVWLHhjgk3nQMboPh",
        "HkNjqTLKUrBGLYKbwXcuejSreedbtpMVd9KrfM6kPS43",
        "EWhmR9ZRU16JfmvV8uqbunrUjs9yqwQtN7AbUtw3aJ6d",
        "zRBf2VdkPsKmKcC4oCtK8shABSuwkzCnbYFhi2Q8Jk4",
        "BWLf13LmzrzAD1d9KQ5gYQU8tMKT3dAtE94hL33s1UXU",
        "49EwADkaW2FFGPCSKo89tvX3cBCggEpzQ8jqDpk4YLiz",
        "CMtomuRzYqkbAr7pUMNXNkUG76NHhjFDZjHZF9VmekCP",
        "BZk1wJRGqQyRR7oMiMrrQGnRhh2VAZRcnGbX2BG65hXe",
        "Ck2nB7P29Zg9sBhyNGgBtuQS7W74XZGnAw8yUZRqw2m9",
        "HcrmavLzyLuyXVkN4miGiQm8Yg6sW7nrHJ6shZzYTDnR",
        "G3CD4ruStojEvZMHAYjBg2WTqs7bcPEmRfsQ5ZTQhebB",
        "Fz7XKt62mWsp5wNgH5S5RE2gGpMBSrk5uxF814exmK2A",
        "6MmtH8uA6MGiYh5vTEX2RafKZmyos19xkvE9VtG5FMvE",
        "GCPDWxhzSLA3deoWJCxTDUF9gaJ1hBYdJuHsC7tUQjF2",
        "2Zwn2KVjJmrhNwjgZp9Sykf33TQFTFxbwYrqv4MQ6nE5",
        "3pUYmU5y2WBoKAy1LawZY1n28TKxES4QhQhE3PadHuCS",
        "8fenZTDtD27NgQoApjRVTPnZyTEgdjuxkWcQZiPVRS4E",
        "RnVvqdtEdFnc96BmDJza18eGZzY6Hdt6vJ6eoR9SYWB",
        "7NZtkBnn2ojRCYK3rGhxyR7mCwNhLTd37PSubhQrADAU",
        "GBrPVHfsgtScRiddnUv6UF4atyp8RJtwmvTwRbQ6dLyJ",
        "FqRXiaGCPTknwME5xJDfKvTDctkMraBDqsVRcK7yG1kA",
        "FvR4GbFtsigwEUwUmUv93c5QVtDrnSHqU6HYfgL725Em",
        "37feZfQTeM3xnRMVkaXYBMjtDqNcdmWP8k8zb2Z76SMR",
        "GVpS6gqmpzFCftCkz7rGTdxdSHhaE3aKwKe5jqxpQWFE",
        "4dLJknwJH3wRb7TzrMKkdUL1D3dVsXAe2ufGjZHp3m1o",
        "BxkzySktUYig8SmtdRjSr2vWNb9wHqLALwAD1e82Xrb8",
        "6jpFHdYN7WFthr492HxQeFqZNy314NyX5qHacWRFftnR",
        "9zRujJoQKhydpzudcmcbF9FAT7ZRwhcQdEzmG8QzewX1",
        "Bk3doFRK9DBqWS7yhHSfU8CHcXxYd2WNkowe8EDpiZag",
        "EUu7uGaN9h3vyjEHDvoxcD1AvB4DJGNRLzmbkFTejEk1",
        "Bz497tdpPEUjkPqVvHjJtaZ66fuWbfwMMGeUT33LWf8V",
        "Ao2dT4LySu9DFBMmWxDKZuP4LvuCxtTodeDQQMVaoT1a",
        "8dYsWaV3eWCsvMKJ1TAX4Skq616shtz1QHPbNnQjXWfy",
        "2LA3uZBh39f37sY6aTSYg6WMAPNSujsytT41c221zijL",
        "HKp5ZzVWJQuymPavK8EX26b1rjrZUs5SmS24VUJ1cSc6",
        "A8GsoC34BGSiLjfaUM8sJMme3cqHcX6Ent7uUmm8ZNLv",
        "6SLusXWpS1HSUgAQvAhg51VvemdgSCyCqs8TvE726JBi",
        "EMXkhHiKS9LfnTt3uH4chM7gYrJu73WXqxdKMkvEpu5s",
        "7TUJJ8Kv57hk2zTKb4N8LFSVs6Nc2v1gmBfVtwWFEaYZ",
        "EsPwbYVe8d7MrXDzyn4jGBNUywH1eKh5Ww1R5Zkuzhe",
        "9t5SUiyCetRux5TiLQjGyJkcwn6yeeQANkjqHXqsp5To",
        "NGdLEQxyoTRYUNWFuiLtcc7cATUVfRNAr1TKfFShNNi",
        "7ZD8CzyKqcGjLPdiKrPpQn6fuTVSdvSNdXeHtFUgF1WE",
        "5G6GQ2CfVn1jeR5qUF7VKgqt3Tkx7turXytyP8KRjEjD",
        "B3AFXqVGvJwuTn698hCKLbJZx6GsFWQXbRoWNw28J3QF",
        "4iQyRRfzVipGFWz3yAKqaCr7ZUM6nAosKUh8eBjM4oNE",
        "3wpE1JPeonAnHcTzyV92urHDjKJ1LPtSMhzVerYrATCo",
        "7hqpo8gJiXxSxNenvXMu6bkx6G3ybUsZGW5tBeMSoSby",
        "FUKSr9j6NTCiWZfZeZXkbn8Cgku6LtjFkrEZoSU812Xi",
        "4CpV1AnqqCFoApGAr7SDby7YoWdVAG5VZDrmuSDqMwAs",
        "9i845K4CvHejT8yrUzcXJMzt8hGZmJyZDiwhbeF9HMxG",
        "B3hwDXVjwwTJQyP7U21HwmzjNSawKPRvmAw6ws9FZsbn",
        "45Ao63Aq7Mda377uoUcrrv35cJqvdY5yRPofwgBpja6Q",
        "7aEeb28vLdPPbB1wA8mQYxf3UGbwjRQ1faxfocgTBcei",
        "EDmf1ef6EXSgcfKYMmfNxaSDx63NkVJ8YKQeyHL7razN",
        "EtuCEtXCGLcqxrVsMG6agXWS2zNwdppYyf5buWbjhCR1",
        "ARYX3a12VgxCjecGVAnJxfNf3c3qo2jBWxuBRhRGS9EN",
        "AThMHWU4NqVrXdZLd2F42AmFsHoVfM54T8p8skXYk2Uw",
        "4LZwzX3QhpjYL44H3mW1XdaFphxFHEvFz8jSCeNQ1Q5F",
        "6v7k4GkyjB4YfzCuBi6AksymaNby85FGGywLudEQHQCL",
        "2d3aVXzLC2coxsTsHpzSy1NJPGhXVCesPtQYM2MwM1yp",
        "3XDGqYgjcdziS3ssJ8s4KEedgrUMedS3N1ZDF6S7ms5k",
        "5zQN2ESV8XBbTnDAhmWNtRZ3EuDgsbb3oCdfvzNYfsQd",
        "6WUBmLLD8AWQ1W8rW5gzdFJPauH3UGLRuB7ctfk4mnco",
        "DqwibFmFEmhoY5437VCoTmZ1hy2Sehjb6DZgaDL5BTWF",
        "CpubNZhWAF6Qw4Xm853LtmzcD76WrHWac2Be7cUsLbtK",
        "BpP7aCdrsanMna1BoKZYx2Ri5XaCR9S3KLfKgMqupCTR",
        "6f29k5dUpaB1W9qtkZLYirh1Qqo16vHtoeBwjSC3xYay",
        "7zMofXrQJvNZLWGEbHVL3XfV1NawYZhsv1jDK2voKRoY",
        "3Y4Per4AxzYPxBLJSzXToUnEQUYrk2N3on1WmMcLgSZC",
        "3NGoyg2VXq5WZxgy7zbYG61qNcBusMsdogxiiyeiRLs6",
        "Fnrx97uitwgMhDhxoFHA8ZRDpyEWCM83ytW7t1cYszce",
        "GWEMLbiFPja4qb6eFDWbwJvZVLKPjPwYfWwxbxfGAYHU",
        "29yBiAsgyz2Ap7p3UMB7YuoRVrn4uUGYUq1VhXWrMHrV",
        "Diq1PsmZUvYuWtN7BNAXQKB4sVxe4ssLG2VodQWgEDCz",
        "Esu7EkFq2wXKBtXFnonxbpPECC9dfLwQumcKUug1jH6b",
        "C9omUd5brfiLA2VsbbxDMZ7SY89Rkj44MGcVYYEes5To",
        "AZr3sQiRxTatF3L6DHypZkTFE21X1561mFxxXsQBVra",
        "748ofhHu9UQAfP4JwtPZ2hsDjBDLw8GwSxo1NKx6VxJV",
        "3JVryKsKiRTMBmvdBrFggsQuccqmhb6B6HjxjBHCxSx9",
        "C7Qu4RoX2p4HrnugGFRGLyjJ8RRC2DAqExtayxsQ1H1R",
        "31Qze1YPhchMnt7tMZVgp9cdB1AejuazrB8oGVAts52k",
        "Af33j3rFYxMDJzr51c5rWSM29ZQuvej5DjBeSxs58irN",
        "DY6k3Dkwe18iLneaT8Xo3VpJWB6V4jWwQQjoDvEzdg2j",
        "7WTyTmv8t8qyfKYE9SETu1kjmVsBVuSc6Tt5AbJ5CrsH",
        "EWXL4GicX5ScZRiK5KDFbc9bFg3m2NjYgDfhSnRvn6pz",
        "Fs3xMsaipBc18aiWzrptxz766bVjQWidLFCNEGkNGUyT",
        "9zKND52y5dN5HXjsb1PWNUJhvTK7B9gnY24Te6NrDun6",
        "HnCRzmxbjcuau8CbT7tbeCU5UN66jV9YKYbtyP7BbXuL",
        "BYT3DndihSuKqFM4dNsqkNkhi3eGcjoWGSiRMvZbYXnE",
        "Eq1k9Eo2UUuUx2fQvWRwjJ2ES3RqJXv5foBGJpKEPpqC",
        "9b1gLQ4hACXUtpbxYf5ewmDm42RSbSMU6J6Li928yJ6S",
        "CRCQMgM9HAvAJ9vZ1q4WQswgYsMExr8LyCG2NHqRpYbp",
        "96FyBJnRkgH2xv5ktuJBdTaJPr59mDjAEjkerKtjft6R",
        "Fn3VXv6wSqr56xvNNWEmRiLf9HqRiP9PHNtANKmeSJX5",
        "D13kEJBSid5NpPWgKTpst2AhRgBtNoUa4H37NpbyzCVm",
        "B3ozC2gGWCJEV24qg6uo3ZXe3gaGpKSuyr5JgniodtLS",
        "4uTvbhEsNuKSDMLzMGiSpFeAKj3m8HmweoPr83i1HLqM",
        "9eh8GYwQvv4CBkSwpXfQZ4rNgFWkWuT2wFKMdGxmUw43",
        "Ch2Hk3tAhK6K5qKqA3RxMQqUVpNZnvquemJkUiUeeiLm",
        "H713JU9aC13KCorKCGndpjjtMkd6EZ5sUzmazEDTn3n3",
        "ABEi4dZ4EjSrVn9pGmM5dnKHvmS7ayneTDEGx7s2795C",
        "Dc9RGxX4VxyZHxrw9wBbDs78GDWsTptpWfYxtzEsnAGv",
        "9GrhT626bHUUvrEw1nYo9w3EtMTYKXDs8xPGc9vRGJcU",
        "4bV39KtJUN1xK1WZzGrymShX69qhKJzEfcHRk18CGpMD",
        "HmTferB21UVpWv26t85L7zULDoKRNDmKkm5sceCuj7Ca",
        "8RUEoeqwGqEnyJYYqXo8mVUnz28MYtqMQsLiUsKBpjYR",
        "CK6BVdZogjckf2qjeCKjPppHZMncqjvJ4upGeFiDHBVr",
        "D643M994RhFUA8xtnjQANWDnBFcoKWyJFE4pJW8GSnVE",
        "L1py3RcVSd54Jz9JfAujxHWZ3d6qFJEdqFthyRdNKhc",
        "Fpc7hQcpDS1ZCGhkFhStiyot2spVgWQ8ymCsj1jEij2m",
        "CmUcD8xBRgXj4sMGNPL3wdMfq7pgnTAAxPgYVR2jXWWV",
        "2QeBj4VHoyMzLNvdP8581jfSUZnTQiivekqtnTpDQNFY",
        "BkzYnvLhhBbPCXDHNJ7SWNKaHVz7U6Tw7jYFKMqx5JMm",
        "CEyGcZfHUnGFPmTwxuoTb5intzXMxtiUrtKmB33pJRuA",
        "9avKuPr7zA88dGcK4vmKUJMK3wEG9ngKjDGPyQ9CSVVM",
        "8j5idXAe8wzDRJa5VipoBnpsh2ey1KEzXJRuMUhrJyoY",
        "DT9pa1zikivkAjnJ6T69rit7H4fpiFY51oPAB4hJWVyX",
        "4eRavziEHsAFB6ZHHqd6Bb1f6bT4JCBEzwoDoK2L9C7M",
        "2ufLUmu4uPcRgSJ619Y7oAnHd7uV18FMgJsDjmck1fbr",
        "GDvDViu5EVNBvNdN6iYoR2p1S5Md5iVM6TbjxzemCJ7S",
        "78ztHyTQviFMDWUYHgkoH4PvTgt2wtiHXrZucysSxiY8",
        "83bFf2BwMuzpqSRvWTbXy5nHbsdb2xeoz4gM7n1p7evm",
        "3d78GbVHPDddmLzGnNBsFQnK1GyKWcJotZSRR1dqPtsZ",
        "8dGn3S98rFX6UmQswqzG5yEMK8Pa4d76TpbuNXegTD7s",
        "VJeczF2oPQTmAS7rUTcQPoucNRE5gp55NXbkLtDzyNJ",
        "CG5K5ybwvJAdpbwPcM4da4ZFQzVvhiHg1PYtZVkd7E2u",
        "SgFY25HFSVwEMvVNCiovUbqKmAhJVXmBEkwfnSX5U8W",
        "A5GNWZQdP5KaLMo2X39vEPnTmUn2FACRYKDHQooSQKJL",
        "Am6pqLxvpHgyo3CaqLNEjirRwHpMrfBNNZdnfdDqPr6m",
        "RpPUwZhyWb5n32EjA477C2Deu2X5rX4LZZmbq23bSKg",
        "2yZSaF3yE7Z5zeacCwvaxabAkdQx8BUxDPkYJoRiEppn",
        "E6JH7Ji1MjpzGp79TRZMzNxVy7eW5vRnLdRM3pnSL6X1",
        "G6ubG2ZCBR5dYPF8sGmdQoaoMPHkprEGYYWZhL44kxSb",
        "FwFtPwoGEoSfWhSVcH3PjTh4RuRR76TBxWpJynMg95KB",
        "2KaoHatCnHkUVYffiMxZTBfiMHRYYdx3FUed1uAgJWAY",
        "3U1kmVZknXX1Y6x6Yk4Mii3a5EL6iUbbw5x32M1z3P5q",
        "FRg1wVB5U85yhaupv4kN9u4m5af3kgSspxvvUkJC7uvN",
        "6TNBhoRad21JwdqMeAdHAwNoco7CanVZv88PPx1kChsp",
        "DnfCY8vj2ArSqYXxK9jmTb6HCc5zFjA5t1ywLxLkQAFE",
        "7m2Drh4rVWDZhxM4XHMTCNKeFWWZqZnUagWCUAPE4Lhp",
        "7RMHJmLLsacHZU2hPh9bHNdBNZ7kNNiaRAYJFJ5Ks5N",
        "CoxJHE9Aut1js7MgYCJVCu442onQRTidEWqyhmg7NxD9",
        "85mQSYww6yXM1YnUNETh59NWC3JQHzXeMX83h9edohER",
        "47tLesdrznTPt4JdhjRxs81w663TYdsBy8kuTrHmnnEb",
        "3j9eugjUcFyUibcQpkg6u1iFei7ZMcGKp63kmjNT24fp",
        "EFXpxLE6TWuuj9iWMvkYLotEa2BwqoKhxQcFsxG51WKV",
        "D6qcqu59pbdNrb5ScZVGo7WtvF3FfQBUeYcaju2tVBJN",
        "Yp6onzFhsMvWPhPNcxjRy4kJ76AqMKFndjyqV8zUiFH",
        "5bsjXL887DV7vB55dJPS1PQutroTV6EWoXpkiZoHisCs",
        "FCCiNt5ZmzJod1SRp1CM3J4fsuJXsotbQgvYqhzH6Luk",
        "nAPikaGgbiKbFLNx1RNcZvn7YAYCX7gTHsQmxb5UaWi",
        "AwAJ6kaDBfoJAGyt2T1WFpUJgDF3mbVjVWAH7aVuzj4Y",
        "JBwQprNHVK2xQZfmXi6rx5R6t8bGP8EbPSeA2HQqA4gh",
        "HWm1AtDGUmtDANmPru1rdkArWZMh32jMwsED52kfXBLk",
        "FtEm3GZfCG5Yec9xwZMuoWPRyQX9AuGSqmMExNXjb6Fa",
        "BXNazcr2LcnAwrDJeCoHxb7JfFdgFpY9UiXAXMfJxN2N",
        "7G7XLMabBgpaALRPofuaTZLjMhNcTnMg1YxXZgju4hJR",
        "HVr43ioMTBVXT2gVqUBk4t9MKN68GseKM8CiX1GJxUwW",
        "EhCeavQuvQRf2uSNPW1dJb8hHqa511TyzDXyjM2BTr4x",
        "AFQHXcopFqBH8SfaLk5f3X5np92GLsh5uvsxCTP5aQNo",
        "9VDxWzd9Wknc6uHBYPRf1bTEbr2Y4FhT8bypKwgTAfgF",
        "7G5qqVn894CXUuYJg4RDWeTqCddgKUpdgmkZ47gnRMFX",
        "5ekynrwfLSCNZYg48usEPpHqDzbZaF7Zi7CfV3SQ6uCM",
        "HFH1yrkJZNkraypjWq4Rp2R2oVpojKyC4DFiinz1DSoa",
        "2gKZ95ci8oFLsu9Gfk8ftUPRojPbi129qL5VVdDJjJCo",
        "88Dss4hinpWGvBpjioVn8R2XDjYhJzXPq3Gi3KDV1Vnz",
        "G9VdARfFxbv1ZLQcuzX2bY7tPoYeEH4Jg7KjmzPPpDAm",
        "7Yg6gF1ZrUzwrh4gDNPRgpKD8Bsg97QHv83xZkXWpEGB",
        "6BHk4kYtmmDwBjQnu1MkspLzfiMKZFpLhPrV7bxDvtUE",
        "DxdLanccDBmccyty94NWSgJCWw9NSHwpCApPtv4u1ywo",
        "GUyNWxvJ7EBkibrCNYCYJBnrwroFnJCegmxibBmoQBJz",
        "CjtfaJjRazz8S1M2UHzvXwyrTJLwoxTaY2EzsTSDZVBY",
        "F5ou6ugAVMpsrbcDYHX97acF9mf797QDPPZHXmL6YiTM",
        "uYJQmPj1us26ukX88NeJa3UyyW6jTqQsSRUJ5HtbCak",
        "FiVGppKCxaw7YToGgHsKd7SLoRdBGcKRTwb8XJoV3mZe",
        "B1aiJhdqRuLCCKUgZLjG1Yrk8UxuYMHE4UbN3DvozdAc",
        "EhzXqVeyjG7L6PW9A3qNWaSyLgQHcfVAwQbT7mnjEm8e",
        "6TfBb2PHLV3p8RWyJUbirxgjBAHvSD7Dac269JTp1e1T",
        "Cd7iLHxT6p24H4WsBKrmJrsY2kG4KyGiMRv8WeqtKGpr",
        "7qtFcRaYPv8RY1rGzbph4aUckB7ZF7i58G29RpetpydT",
        "EJjpbqzzAMAatcRkZxYjPV3qZW5j4Rppz1BjGxecdzXF",
        "GA6LrPLyGNnYYBTHrp7kHWF4RdMdVKd3f2JfJUmjmrCK",
        "8Y7k8St2aQ9AX6ABDhq6aZDhk7w4RQsVDCMGyeimy6za",
        "uokipgXVNfnt1u5TTRrKKke4F6nSu1TgQzzyVMt14y4",
        "FT1VJBRD52YWRtB3hD96F1ZSuYy3Tssh3Dv5EuucciWZ",
        "VXBnFBNdkt6orJCrCLrsCqwUAiRSCrYeGxvqsqAbjpV",
        "B3d7kmCYnLgKi7d1D5mS7M6vVbViNESB5vVRhbXf5bam",
        "2E6GqJ8sLzdkwdDmLzbcTiFUSQyM1QA7RW6sx3Pz3Lm9",
        "Apjs8gm4w1fbpaVBLFCLvDFCKAhkuFSgc1zyekURRsFG",
        "37xtD1t3qLfMAgDkwYAKJrjvWEKpCnzLu8a1BKv9TeNA",
        "Gwm89BMKz5aYz3H3jrw6QNeFnmc9frVENUoHmqsPRWvF",
        "2T9cnviUXrAiTrady2oU4ZJzUWV2EuWmU17nSUqQiqt2",
        "FLxVwPybZSfAnDGEzRqVsbDawKCkaVGQY6itErq6DU7A",
        "7F2g1pBGWvgFgyfYDR3mXcvQTQf9h1PGjedKCwSZR43w",
        "DV5JPQGN9DxTQjbFMiV21MRGiLCb1zcgGXCXiqyuczNA",
        "EJmefTbessChi1t5aUJPFJr8X58wuuL8k3AuKGErxyor",
        "HhVxduF8DQNqDKdH5Fv3LGGbrJMFwPHHr9V7vLxnAoWo",
        "HSSDkkkMdPuRtv9aTHi1BePUeqr632s49PtMcqEkuYZ1",
        "oXPv7f4cLJV9LEECFJfDc7HhxMjwZHWuZRCPxeyr8cF",
        "Cs3etBd1Mw9xptSgFZFmcK41PALcm1XHX6yHmS5HsPLY",
        "9DgujTA1LEj7Bc744xYih1trYza2tBh8GW6AVgBwYxcm",
        "d5aNh3g9BBzz8t1gqPmRnhYaTMj1Y5FkDncj5euD7Ay",
        "5NJjHX8ioDdpbVvn3M4dReSoz4WY6Jy45buwQYfmUZ9N",
        "9z8FTM3Ef61fdmgRmeqjLfkYNbN5sJiBSmLSgj5LTv6y",
        "BWuChbmd5EunE8zfzpkguWBeGT3iJ4yazWYZscUJHPuz",
        "DGmBy1kv88BFCE25o9BipXcfZBBfMVCPThU6P4NRZ53o",
        "CvsshkTtfrmhJEatw2gsXbcDvy7bLmzRqHpeeMnYAb9j",
        "A7KLV4PFxkpbkSwmKig7wg6oTzeb8s2c8svPWX3tT3ov",
        "vCGmz9PjfTrMh2uK23RkqToZ1Jn2yc44D5KiVNaMt9S",
        "khveApXkr9N7W2DJudtMz7wnCRMr46qdiyFjMmv3A7n",
        "2xUyo5Yucqk4MhqnrsKG5J9QS7Xte5D6QVd4ardno21S",
        "BYCaZeqCoqnxgTyYKfZVfPJo7FqJeUafV2QAQvsB1Cmm",
        "6Uy4bU3cYt8Dmkk1xJHiobjx1uAUowVwo7Tpc3KoLUt1",
        "G1jK8YqwKFtMUPXDAwUVrBUtABfA58smfUsMAAgu2nkP",
        "FacSjsfkg6ntVbEZe2hqAuCBasF3aobXJyJsC2NT4kXL",
        "FGcdau5dPf5Kj6c1Sygq2pkd1YmHebBHModmUcJ29rXi",
        "2fR4Ysz9xrXZcq3RgLmuX1WVPgp559teU2S1FMKXzxmp",
        "9SArNi4VfYEFgotFSn2EYhEQe4JvvXbMwup4CPE9Bhn4",
        "2okyCcRgjpqCcFfSVUdy8HATYdtznBWgSf4iQHxZ8R9C",
        "CSZbTBqzycU5dXXoMH59hoyYwqSUrcQV6vZoxMi6TLoz",
        "Fd8i1fnBxchN4FKbsoeF7Yi18L3MG3kiF8vTWihBzAYj",
        "HdzUfkf26cwe576VhMqfrNyYKTis6ZEQspGiUJg7AgAL",
        "6ipRAdmg75Vtg7pLRxZbFyP4gKnHQ1CjW7Jw2kazKejY",
        "7dhf5RBZ1qDitRu9DD4eFHZxYfpjU31JzFRKhPtMWkUP",
        "Bwjq7sx9gQgnsbs2WoBgRggLwrCxSWfy2raDJoeEa1pX",
        "75r9SBkXNJN7eYLCmycqDZvTzCC6i3hkXmjPbKMK3Fr6",
        "NRSjAoeFq4otfpmxHkPdfpjUb6bCE9nsW359Uk8ShKP",
        "ABgcHjC7LMgtVviiYRnTBrw4DGoqxvskhTLNym85w6Rn",
        "2cVkRnfE8UYu5CmnpuZRs3DppmNBqu2uTvDwANXF2t4v",
        "J49wSFm54nLJNUyr83hRxFuAnKrrM2CB8ZqVLWMUhXYR",
        "H35rdLpWzBfSuWVJatYzh3EG2oTq9b5G866RWNcXzhRD",
        "a8gWhkj7oWdPAXzkr4bboJaGA5keTCUbmED457w9Q2u",
        "24tx9BHTDG4FaqgfX8KLaDULbFDhXtj17v7DJMeAC7iz",
        "5vqL4ha2XMTgrLraHsWFso6zFs1VGWnQStDJLDdpwesA",
        "Ee2y39JxJh3xLXi1jr68cPSnLbykz2urKW3SbCKXpDuF",
        "Dea5gHJDNRiQks9H8e9cqDJZ1kJjt7kBmHz3RrzQxY6v",
        "7eU5LsrNgRAZFPV2tT1murhVyXP4LXt3E59bagYqPY6D",
        "5uMD5XGWZ1x6XJgeA7ULqjkU2cawniTvUVXAz78KCeFF",
        "2Ftp7btsqzspQYhbuhrxFLL3H4CffZzS6MTVhpHZsogj",
        "4GCKM1T6MT8tVRkp1DKNztdDhgVjNz5dxLup9gnrNLRY",
        "9fgfeYgzrMdDWQ8jCg1XGtpiyNekSzxDmDP7LyH3qGyh",
        "AeaxUMdiuHn38rPJ7C5T9Vnm1PDAHHZa7ymjfZSgSu9S",
        "55r1R1c1Pw1uCX9mRWAYSoK7mKL91iq3Vz3rFxMEmcfa",
        "69dJ9Q2rK5uW45vesqSfMAcL8Aaxx823Wn7Vbum1P1vd",
        "2Wc4pHp4ASBksmxnRUA9Lcc3bLivJ4EpHydZHnSS7SrS",
        "Fv8TociPm8uVtMvjWS3ccsAJKATACUUaCiTdJddkrNxc",
        "5JQZpgEBqg9QUHJ9qH8eibJ43nXrQxkvsGWtBtxXSe8r",
        "HA4jV2823LZAqTvQy27zDtjJt4fxNE8reUPgcwHt5VKR",
        "DpYHtQ3CRgYWkuWLB4GcGiMaZi1BaqWvyPkyw4HMHpun",
        "2BZCXepjSBDgn6MmcvmufDT4jyCCLShBaTuzZqtyrTgV",
        "8JhGeV8U17pt7bEJZCoyrpH2tRn4TW9UXPd8NqgtCCX5",
        "8BvTzNtg9m8cw8RvtYPtvQ45PkufYxzBmnQ1NdpewZk8",
        "9rhJ1qVrkuGMRQPky6xf6PYdHXpupuAEqxX9tFVAeohS",
        "C8dziBNvyS3gyfb3TEzV3vvyjoVYwVc2pACZDa4WAwNV",
        "HK4gvDne6AQBmypdqz1bvNzK2N9rXfsGCSgjK7hgw3kj",
        "F4PevtXvzX8GDwU4iuboU4XMTRcT95iVuQeihYjEoiHk",
        "8CtwMWCN1VWop2S1D84iP8mpVr2uGyg8PAdDZqhyy8Wp",
        "2JsGSpJKW492Q7vANrgyRDbFdRZvbtMXW9wcsBxcU4uh",
        "77cNR75Ag8mGBtSjbV2AFnjZ9NNKVvVSDZL86cGBd961",
        "ny8aM5EoGS36BwQZh3XqSKtk1i2nHoPx2GhSbzaGTGX",
        "Nft9eLhNB1sKfMeTEcv6wKx4ApWH8kMvUisjtjBj8un",
        "7qZiTGN69pSmu3gawCwGov5FVXokUxMhd2eUAyBETkgY",
        "8dqby7AHMd2gYNyR7RVLG4seriVYHb2fT8DEWiJUGtQF",
        "BGQJjfqtS1dSoehFLXdivsACMEAhM2cKFgRmNi7TwChE",
        "2iscdXuxhpgHcc17Po1Jy69YxHiPoVg4Gzbsk43BRzqQ",
        "5vvdBsPjhGAQgR4Di3uHWZdTggK6GZQKPA3obJuUd76B",
        "6oZPNAXQb3VdUhfKobzw3iB3RpqVN44UgcAiy1rjv6ya",
        "DAJ4iAX34NxtaiDB4XrA3izMgsDGpTJeZP4fE4kSDiZc",
        "Cinsbdu6f1MDnFQHx6kJ9gkRVr9krfvPcKPfWVw2yLNn",
        "7nuTXqnmvq1U3ryS9MWwCZKmtXfrWFcViZ7uPNxz8aaG",
        "G71GdFNjVNgPNXNfgwQeN3iANNsGpsfDPgDVKVgC6tVV",
        "FvXHc63HPtwYPvWgYzHbK8zX4ASzR8QLep7aYX3Jjfei",
        "E2nko5jPoPnWttukrq5Nm6Mo4Yeq3xTjH4kE5feaefRh",
        "d7q7rTMeZQJcydmttUcH5n8U3tMY8gXM6DJkvnMugn6",
        "acQ4ZxxYGWWz1icnF1Y8Uc1SiJ9dRs3dgVLaqUHBua1",
        "9daNtYSticEMKCwkrQMq1xRzXK4sSNppxbWrCVemx4Ks",
        "9JkU43mEPmBJcj2rfU6euPjRkRei8DBdQ7UusomQF5C8",
        "ZzrB6k8xtYLug5trR3d4daaUZd3WTtvfMJ9cJuFCiFj",
        "4BAPXQtxKXA1LdTawPREDibLHciZr6sSBBbhqj1PL52Z",
        "HTyejw9QMDQcgEAWGFX4974KNmTM8iZtWHqTa8HZjcK7",
        "AYygddcnS4z8QBVixmcKGpcTpE8wtbhcGcfwX1FdyP46",
        "HWaLQ9HWhKDFKgUWogqS6fdtpwJMRAwkGyQoMizgdnNo",
        "4v4r13zUSaj7Bkx2SgjdSPhVWx3esuXTa5ZwAsBdBMiA",
        "6chzr4HPnwYtb7qpchALUKvfh5YPyJjnpJFpHGrS2Eyg",
        "3dtUfjC4puX5rE9ayhF9potv6snG36LspjRqh5BJbz4C",
        "F4dB77EhefD8iCLd8t1NKP1fjzNkCrxa2nM2eH5FYP74",
        "vbBMvrzJa6GxEhJwjJCsBcm53A8vbJJv7wyyg6nfD9Z",
        "DcPs9YBK9Yo1Yks9g7Etq4eXRpsxPXbk1b2ww9etCH5d",
        "AWa1i6JhAPRLoMG7RD3KCUca9UrrQTVgmQAEoFrE14tJ",
        "DbAqekWmhwMx7nv5geb2s9QQrE9Nva6jUBkgfjTqXx2Y",
        "HwadG85ZmEENVRW5wGxSn2h3eXvRDwb1VRqGSiz1XH3q",
        "J16XPxg8tvB2SXeDe67EUfzQbwbmZUFw9xGTXW5UieWe",
        "7WfBtmSxzYXFmyEjEPTcMqME7v8cCuHaByQRXeD6cP7y",
        "E4pnFjffLDa5jKxaiXwFEjfvoxK9vDb8X1WYM8ohWBdP",
        "7vVTe2yoQJ1rn3KcStUmwnNSaYDEpkwcdtMGHG5EGHdE",
        "DjVKTLtzzTL51ywtgnfRc4xmGGiLAbJ899dXMRhQt5sW",
        "FBQtTqPUkZUdQH2Msv17bzDJBgkFbSWXNEdDTYxG5GNp",
        "4qnKs4sxWdVrusy67bVcVWbn17gUU2Mg7WZmyESWqu6g",
        "CTux4iwAkLdtP7P8zwwmxNhpW8xNiFcuWCKcfSwynFPY",
        "DRPeMowpMdNNLzmsq6TydXPiMUosLAgtcJGmxPAVDNYA",
        "7MYzrEnB4ZEdAg6sF2CDPfPHhRw4XMfmcGw8YrLCisAo",
        "EvSHz72JbNnF6rRD8pjmxXXqpjJLAYtdH9YKWoxRXqY2",
        "9KM7T28C5YNc5o3hLCThAJ1vxH1VKtnB4G9dakNsSM4q",
        "Hfo9voB8c3x3xXrWfFUV1EDkrRws4eKB6afqAzuffwFk",
        "9ZuW7csERSUy8Nn93RufEVPY6ZUe9QTLdqtJXx4FtKiQ",
        "HVDbpkYt6gJdmtZGN87qchPpHffn6w4AiXbaVJGBESgW",
        "B7XrQBa1ojc1G9kysMEeaRYieHVgmpTGJndjCtwaNdH6",
        "22DQDxHL4zMbmHiUS4hfVyBpVZLzM2rkqxXFEe2YCEk8",
        "3ieTVMdzfpkDB8sPZo87Gu7CVShyytKXqvED9ZWE7h5Y",
        "2MUCeurxarY5zqAvhvhareQJzcmkrpcLKKq7scNQj53E",
        "CStSxBoBVzsLFiP9UdreVa3KRCyRhpPzAC8d9NcU3TS8",
        "8m18HgAXHCCbhkprVoR635XZjELttuvCVeEBLZs9eXzw",
        "GHGu1sXJxMXR7bLt1ZxeATufkNYs6QhZDfw4ufKFKHFX",
        "GSKtreZybMocYqL8x4Wtwpu1AKNzR3Li2VAwZN3WFGMd",
        "3XyJe91DSUdua1zW6mbn9UGrAYAkz33J27sYcD3wh6Re",
        "DqiwTTSTqN82GAQjF6ZRuFifZAY9MU1zcqAxg6ELqRUq",
        "8qziYSwVCnaE8LpqrkhsxNtQRGzsYyRV4AAnTxKUrkkk",
        "5ANvRckFEyUmshSdU9NB1YL4X7k9FCeo4boTxKKiY8QJ",
        "EnvUGUtayo44QUQZ9J8SdoUEBCkqy5ac9zq8xa1yrd1X",
        "EsBbiGTXqXi7jTT4bNkop8824SdYwjKp6KYRy7HWtHcA",
        "C6mQHNpeG241HqzeE3T31gsa46bzojHANQCYrhoSEQjk",
        "BsZshP3ETRHx5hXuaHg4iUHJ6ygULgGzdvtGyPqMKq6e",
        "5J4nuBoyQnf2pt5tfKrPoipnDnPBDeZW2wJ5VHy3CJJM",
        "B5d7erDZCZFoXoxVvk3UM2FDdQcFi7zSrF93DU3b1e7Y",
        "4Ag5wcKVdjXF5yiHsRSAQYQQjgpNtWr3RcJhZnBT58uZ",
        "B266v8DsysZN71DmyaAN7iCb6mVn9h3BD5VcKMQqrL7D",
        "89QEab7sgfWNdhTkbJYQL3tEqwZLrv1sfiBaZqz5jtJp",
        "5MC8ofwC4AB5fKhuiUAWhehc9tQaGJrLBENATk17zb3y",
        "FD6BVzvYPJ4oEg86WGq6HYheHjiKDZzhGvjLgKxXypBd",
        "ERWBkxcs4qqLazRv9ury3yghGKAyxa3oKF5Dwvngqx3p",
        "5qhxrPXg1kfXFCAr123TN2vDpeS4vgb6oBsuigTPVWhC",
        "FiB5rdpBg1VirBZFy8zJheXywK6cCtvddQvhdtyRjsPT",
        "HtHCx3R8UyB2wtaQ5xUnNBWmAXCraEu1x1QdBwkuSHS3",
        "5spT6LnmirQF3375EWyp2DZaeadGcMeB8pt5cvz5EsM4",
        "3koGFbdq2k4QnG4nDM8qW3Nxey1ErQJs3Ahr4uqBrCVu",
        "3MCPsYVuRRbnXZWpDu4qc851bGwFvKteA6sHXd1u2Zsy",
        "Bi2gEQsAdxjQViny6LrS1yf2ZmugufxK4z8GuXAiAMnG",
        "GwBCMXrEeVmnZuKCKQBDFRGhCbCKWhcFGbxWkJTs7CHn",
        "GbbVm6KdPJfrn84jd91L3YUJGwqXbEWWkFegk78sy212",
        "9JduSNQbosiXegSfjVt1DzFEx9J2TJH53kAVK3wqzH4N",
        "FmXMMABPq9evuV4z5LgNMrYVg3uLXFwqCwpbJP1DCpxQ",
        "CSDwVv9DNVwJ7TcovnamZqnzq6T8wrHctcs6P9g9FWed",
        "8RuyLSpfNRmsgxaCqUuo1cL3pcAJaKrRJEUTpoiLU7zC",
        "BNF1uzrS9XUyjUYJ89X3QAhmJZLU7GyXXpMSp96pSx3X",
        "ZPDJYFehERpgc7T5xYqi1mX1UZNycSvuHy8EncBc8a8",
        "HfyU8WhcoMyfQbeEqLUnZyihJrSpbjRZ7hBWRSe3iuYV",
        "FvMFUaHi1rwHRNbeFb16GxtNUqqqTsEeJQjUUWBn7nFj",
        "4yZb89KUQBppFQhVrcksb3SH6vG1fhHnHCEsPQA9ztCy",
        "887dEPR85vfSZ45zFrxttJ6cLomwvnYbh5HnyGbTAXVu",
        "QmS4smK5hRzFyCoZ47EiUgJu49KK2dJosRhRVKaxKLQ",
        "5EfrHLuHvp4jH6pjTJxXHr18AnV8hnj1FYqjy14wDmfo",
        "5aPBcPH2KJKS8w8boTFoTRtGN4XAxHgAuPPNHFN8PLK2",
        "7GYfwJh4mojaGdvuCbpGgRYA4WXoQyh24U2jQa2WAkvD",
        "5X5ke89LrGY9Nyz2wPHp4X95UKXD6io7mY81gn7ic6B4",
        "C6uL36oXPC4MEMAqc5mqPHaK6imvPBmj75BeanrBd7qQ",
        "6EVxFR2XWzyYJU8dgpgnJj8uDM9m1Q9i4EQPpzayfKSb",
        "iRZdjSvWBbBsSTXqQM72VVx6BKaWpUDFkBcRHF2brS4",
        "8n3yrRMYvQNmPQqdD6LNVZjSoF7g2wrR2nGwzxBGsuE7",
        "6mdkGmUxwEaSjY7abttN7bG3aBVzXacvftfSmk3pVAtP",
        "BLE6AxJ65ZYvqrug2JvFkYhd2jLJ34ZjP8RsRZYm1gqr",
        "9MeJATttswsYTsuUwrUAz3ZGxPCfn2ukH9CLVB1ueMzZ",
        "GZDvzyLQb5C1GcLFiEFxRyXD42NvaWdEpfv9tTn96LLq",
        "HVCsUT3JRBrfb1QCqMTUAeHCJermHsPs1nsdz7pf1WVn",
        "5cErBjGEEvcBqaWrgzfh8QaTxyu9dkKzGRWJq8MTDXv8",
        "HMZsyh3eCVirzKyfEkUQ87BNcudkAwUXZ1iYs6YRY5Pu",
        "DyAxUqzX1j7orpSk2XihTfk5w1i2c3Jy6hxg2i9seWdU",
        "88FNqpspBBkaHNpa4EhkwvCJoy6DezjwKbLG3hT8DXeB",
        "ALvxNyLR3DV86DxkmkmNwf5PpTC76Re734XQhycFW2Sm",
        "3rrZaRq4ACSxS7uhPhqfgDcEJB38iHdXfS5ECwcjPvGr",
        "7iPBeajmHsusLPCjfrf5SB1QXH96zsjZiZeSu22sSK1R",
        "DH4rKfpBXTK7jbrtYmeetfqwvq8w2krMaD6Gq4X8DNYd",
        "9nsanfSNfB2Vot9a4YYuHjyrsDELp4YguYtovjRwM2Ak",
        "EfeqaHQYLwZuzBLJyQWwLX3pNF1PjZxfWWJdVUMocE6g",
        "ETdr6EXxYkZ91jY9njPEciiy5p3SmXTTuXzCZbyH69bF",
        "2XV3AUsW5oamNgarZXfjoz4fHYkLfxN1DwBa239ijN1P",
        "sZWtGBG6efkHy9n79e65veRHfUz39NscyHbY79rNVmN",
        "386L9W2gaGe8W6mUThTmE4cRUg1t2NYi185K9FXgdS4j",
        "zxEDE4ocrobbzvQ83KB9zbMc6NaJpmSWvG5rNGbzXaf",
        "Bpr4n7K3ZtbJUK7PiiMEh3be61x5JuRFZUx9jxrdQaym",
        "J8qJWV9QYJGXcimLkF5GXsibdfUCpeqatYKyAJV5o9B4",
        "3JQgjtiYSkL75jTTopsq3jAEqEHHMaa5fGQSEu7Y9pyy",
        "3n1Qg6eHn64aKd6ANdWwabtpnUifdTeUjkcKWDyAVDj3",
        "69ENrfr54UxSLuV3cAqvgqhaGYjeUeMJXrPcEMGrpsHj",
        "aybvSQvSbxX53r3pDQqBKH7WXdZaRJeCAKQBUZ3idoF",
        "46hWLWeCpqjtDKRBcgSAMg7AbYr1d6KquErAi2PRVzFz",
        "BbMsbXGqH6gWbJVyR1ivkzDZfZv5iTLUgBiKkxEJpyKp",
        "G97oVoMGYcSMTQSimg6qCRcZV4c31QAECTy9a34jMX2s",
        "FBiQd5nGxNuvrDHn5AVZ1BbDtWjGwVdcuiqH3GrHsb4d",
        "DRUx9b5vi4PtUrRBu9rEyUytuMG744s1zqfs1HGuRydc",
        "D1PGyY9r2maoAqajwpAbRDKQBCWimuGEfdtrnfWPxwWw",
        "Em5M3Gb8cf8mgqHtejZXtFNrQebNabrNSNLN56L4m8W7",
        "EEXjf2uEZXvtKijEmrroj6y1qZuFK8HYJPCKMRCCq7wx",
        "CGhKPbNhv3Yg4kQkfvHLiAUeMJzopY7mEatktWaHmems",
        "9TSrSb1pYuEnKuRF7wmRjWu58nKagaf4jZDtPzXFgyo5",
        "AwfZ5yBwNJsYzTMw6HmQ8qSUdpcocdAL8cjkptmEQAMQ",
        "Aqeo9uJcnwFQ9BCcNGjQ5FMnb7yGPWD41tKgroNJS52F",
        "Ht4x3j1DzPDhzhDkGhDQmSsJcb5NLLo1HBRXKqHqMLwu",
        "ZogBQ19yBNT44oGvAm5KnxFwq1rFAdXanJvxRkVpi1L",
        "ETQEZa34NMB3BgyLTXU6EykjoGPUBYKCR6n1cCZDVFWs",
        "7xJwmWRQokQJP4e1FmfB3coR5NcmUZc57Ap6cxycCE1v",
        "J6sznDRjsjLUCPM74VpUUNSnaWX5FoVY7PUpnFRiPdpt",
        "6MG8kYFSVbYyuEWSPpWHiFZFuoG4Qeccgkotio7GjCq8",
        "3QQC3QjP7bWdCknvaK18yLbnPNKa9nGDVgF3sBaJqQCp",
        "2h5rkBu2GSsqsASjGP3Sev3YMFdFsQN6FmQoELnCUWYu",
        "BWqe7i9F49EeDmPc2dpTdivbZoNgyAB2eZoVe5Sdo3es",
        "DvczsL8LWbYkDZuJnkTBLa8q98HURhMhA4MRawYVAWxV",
        "G9w8xTLgGZkMXnu9fbsxyQq3jZoghvVLJ24vfjUSKydA",
        "72je4LeupffWVPimG9Pu1LixUbeTCVynKAMtGnHD2MWr",
        "Dwi5E366NMYF84paH9uGw28Dt9yrq14o51rgPGeuC3zV",
        "FkUxvbvHYQPwbt4Mv3KEgGW2BA81zBzgvDvPYohbZHYp",
        "8VvvETduAs5SGSXw8aBYJA9P9EVdPb1uiuCwmsDXrf4D",
        "6qz8LAvktqHV4FFg2uuaZyzkavDUVPp1rZgamD2LnXjd",
        "ERxkmKgrtHW9LYeoV7Jx36go4YpU4vPKTSnjsusngtBX",
        "F2foSdDuyc6HPqD4oQWhg3hjr5vGhxDLPv1urvB3WwCd",
        "eRqDwYGnuHRYjKXkeu5a55NpSDWV8JUZfdSFPuAGLCP",
        "B8wFDp8HZEJqD8jfZK13fgg6Lzw8gxn2VyNiAVrDauZM",
        "5mV7xmU5rgk1n31QRkr6m1kK76HZm6u9yRyiy3RnQVTf",
        "EzeQjWQuuAtopvgXg3eis6C2eGX95tsz1Fo3mJ4Uh1DK",
        "253DL2uCMDrStBDPCDbXgDTGM7rskspva3mSr6Ts2csH",
        "BACwh2VnYMBUVnaDVYf5DDhz6TX6iPk9Cpv6MA1vBPtT",
        "EtjZfDEF36K2M9XM2FjQAWmbLptSMJGaxhwJdmGzdQuE",
        "FApY4mcxTRzu69gU4LgRk1uum3VyeRZNRvu8NPQ5x1he",
        "9RGTAuT7ysub2h5k8v7bFKGhkX3GUp1Ge41z2Kt1ZvRg",
        "D6GahFLqUXDFNBFgAfx9NLCwuB48E2x9a92L1BpdcFKr",
        "3wHTbwqYrcevtMNsEqVP6rZDxTEZq8E7WBSCYsDHbTtu",
        "7ogZiSprwffXp54VauyWHH99Bzv6j73EGxU9cj3EPVkK",
        "7KG8Dm8CZkpNWgNvUPVFbX1grBeH3jSLkvZL1hxerESk",
        "5e98z6cqCcrAoXuhuQG6DHUwGRD6n1aSAFQRYw3Jqd3K",
        "F4k1goWd46y9t3fH3kJkH4n8QhTeuEQBVpBbgwAXmqvf",
        "DbhwKraMQv6tVqgjUJzcwBWaNCXUoV31JwgbAp75pubS",
        "7NjVfk1bWu4zkx7hy8X1qeXLaERMHfC8AY5RzDidU5d9",
        "Do8HjBh61zE1siRa4jZH8bBRkQ18966bpYRP5GC9eBRz",
        "FHDD473oi4Jb2zE2DFRKMuzPdeSiLG7SYzRZDV6cixV6",
        "Hx93oqqVFKzPg9vy1HySay8UbTqbsoBrz5aazA4V9Spr",
        "GSC9BhYHHUZYj7A4Y18hWKow69TvM3eDY9M4Zj5Auj4o",
        "6LkWsqf8MzrRwrLPW2tNmkec8adZj9R6WpFR7wipKm6r",
        "CebF7KYswfE4cXgzLePm5ynNY7UV1uwrgxTr8hAg4AVj",
        "Hmg6xKqbvxsviKSghcgfC6VVzksu7C5y9pPkhCRnhum8",
        "uFLRpPm86NuRrjJrheE7uaxeAp7Fbv9a6rh4vJmKrhn",
        "6h5zXfEfKxnmfpz4Jv3sDftCx5CpuNGsBUMd48U1ukN5",
        "HbQSzoQweZTkkM8DG5E6A9ZPbph4oeNhtxarRrKxXupQ",
        "9aDeUoieE5UQdd13rGhLP8P6iYZvK2gejxXxGAv14T6E",
        "AwPsjUs7zeUZsqn8g7rrR1cGiNKhwSXEX2LD7NKLrULr",
        "7YVqkZS2p6EgA68hk6UGQ18gwKP8aoJQMKFYizJrPUFw",
        "4PjjdkgsuJ3PPazGFMqtnPHF6i7nkp6Y7RVjvj2iUAvK",
        "FDR31AE88eZzcRgo6yZEVFRftCvQ2XSBZhw2pgGkRLrA",
        "58ZpEU2fWwyPTfGj1X8iYRQwiVamRmJAKQNJu94ivL5s",
        "6dFY1Dtc14K7x7yQ3Lw7vC7sdu4XRBagY8bENP6KWNhn",
        "RotvtaQ8j7nndDYwxJAoi4jVjvMki3XURZThto743fL",
        "3LoSXFdBz639Vnr1rp4BK6qJpARDciAJUTFAwqG9h6zQ",
        "4fk5ynp2Y5i1R7eFEbghV3tzDdmSSA4sFBH7jAus9ECy",
        "FT8AgXmz8NYUxCeKPbjoPCeRpKNnjk8B5tR8F15Pb39X",
        "HgSDDddGsGt14Psgvc81Q3ad6sjTDbzLzUrZGATeaT2W",
        "7Py6wxtaJEKoDCKvjnP57FKiRET9sMgBdVw6eheEuynh",
        "7gypp1fEGK51PJ1JBH4QvQjd5SdeXsFaJx5WBQmLPGHR",
        "3v3Poib3f2o8QvCnjPSwqHecVbpK8Qgybm7wVyvnYeVc",
        "FyHWVPa5nuuFvy6L46yAnw2dtpoU5N8TqeEyf8nHpnQ2",
        "B5haAciBmC8MQFkcPKBxC8AgpVvDP2VY96eAMSJB3BUw",
        "8AxaFkSZAft2xLUQ4zkmhhL43ocVUg2m8Pdk2dcis79z",
        "9UgwTnJe2J9fE3GRYscAYAaJZi42tadx5q7tycP1UWze",
        "C2DjSAAs5PTKC3VNuGuxsmTc6yCruEGGmKEdAJnf47AT",
        "2zcQAsthSBEg5idewdHLX7n74bao6bDnQ9WxMRcWBzSo",
        "Cbd3vcJ1KRoQze2fUeC6BFAtZp6c5yU8RFtb7ReoEzS8",
        "Edwj1WsCHQvQ9azhDkoReRm9L6HF3krT1bvb2P3SBu8J",
        "VTj3sPGLzZDoda8QFmLtFwnqca7ycskmqQreNzUk16s",
        "CNaZitfns88crcModhu9REVJ8eZ1FLmtaJpas8u1eHt4",
        "2VC2pZVjqvmSRKxE4afT7MwK9MZMvxUV4JEMhp7QTJ15",
        "BP6ExeefBE4fpnofu4ZgN1pWfgQdFA3x2GiNUGHkR5eQ",
        "3PzJx4muVk72TqP8rf8UNDFpoaENpGqCXcqSqK1qFKmU",
        "GdcrNMmPsCL7ZXtgChjZrH8p5XyM6MC2Hntw3ttgxmr3",
        "64V3e6dtPz4zBnLu6QatUV1DFDPEgaUy9zSFgAZ9kTQe",
        "3MwydHQXuBvnwcqppKmyr8vNjo5ErddEWhvrjddqH8kK",
        "E5uhdkRq5bgKVJeaQiuf9weV47MYFb9Ru7nJdcSCPhCT",
        "ELnFPkRYfn1oMzjogkJpj5k5gSVjJPMawWS2Hcysk7ND",
        "Hox6Gpt7nXACnNCLpejjWZsTztbo2FqsrNdNuNXypEu1",
        "4TQpV9ZyAeci1a4MKVw3H8Tu3GpxTZW54a4FDwkV8CB6",
        "3jQ5Dnvws3HgJZgqzLCL7BWgJgZJzxUEek2sxG3bdLiG",
        "8du9nPGv3r4jH5nyhQfq4NvqEmfxnQ9X1zm7XqGG7QkR",
        "FrQSw2kb2FTWbhCmCZcBVmpu3uxDq2QNSAhshy8RPxDV",
        "FVqvVsDrQsdpdzeNgKVU9gKxP2Mto26kPxUUwKAbNgpN",
        "HXkRphPsZgpnrCYAdCtFKua2G1bAA2PcvpVGmzMYqF8m",
        "2pPmi2ZQWgXgkTZYQr56wvazcwt8bFZssU6Cuwcyic1G",
        "FuNzwYsXyY3EaT6iPg4PNT6NwnWEtBHtBgv4U1TzybLd",
        "5V4eXWQZDd5ZD2bid2YTWx8hyeH95RT1JEFVDam77CsL",
        "8eCrfiD7xqWNBCHUNpnafuVbXryK454PHV681nQ2eT8W",
        "CMqyMBXMakC5LQxDawtWzvGHbN3SiNdTMHcc9saUGc9a",
        "E7o97GCtGx9TXuD9MdYZdeobUa1VsF2wNvV9KdTCtHQs",
        "8MzF2wRpCTtKAbrtxN77N3ZFGmMQPULF33NkieB1HQzZ",
        "Fnntu9MG4Mw5gMZSKs6RAPcbDKu44Ynif9teeRu4tvSD",
        "GHqzeEowPVJAAxVY9P1nDW7uMtEtNvDCz5xi6FEY3yhM",
        "AvbjccM5gGEqGHXBJTwSNrCXfsgLWoMgAvhGS611BFmG",
        "6n2d8snYEvqSgKTTD2z1tqP64RaThiiWoAB29iaW4z2e",
        "5wVhtixrBYrWF9ZGC6ustmqEupwwJVAUSJQNkdSFaQiZ",
        "EYjrWXQDGDHMze6brb3aSTV3hz7mHy6ZnAX2ZB3ufVfe",
        "FsctBDzGyEFDcyThLdDLnyj5BvygDFBPArU3hfrzQTfS",
        "3fvRADv4UHrCZdjwMkJZKdDNFb7VMXicGDwrESSj74ab",
        "AdVwB9CTEzoFAf6TDwAxuURg2m7Z1TPVpt5hMb958FDR",
        "BTZrwf54TtckWMdVtR9c5rdT5Xkc3UH7QBSf9rCiMDhk",
        "CvXCPVHvP4jqvJmcxWnXUq9NwuWiCCviivAGdL6FEhyR",
        "F9kEcptqw4aSNNPYyVp3o4VZVomttyPVNFX6AE6TiE1P",
        "BHk6k7NyB6Q9HhfPMiR73SnjqKdZbny2tvgEAH7VR5wv",
        "3H4gLCNW2F6KRCZu9j4xhqjtuoU1jVpshYb3ZDqWJJ46",
        "5RybBrdn8GWN9uwNpGUNwoyY3Z4iqBWKEec39d2aBb21",
        "12jLPBbVFLCq4trfEc6rAtsJ8LYKVHHwVZeY97Wdveqj",
        "7GMBQGN7qZgbKb8KDwNUfN9hxqfqHXxvvBTNCC1gF54g",
        "33r5HBBnR7dcjVeEyvNyHokycMFzX82wzCPyHDj1UMeY",
        "78jyM4GKrVZVtsq6aev1PrJCFLR985GUu3GchFi61dY7",
        "D8WGh3q7DRXqai45wRzNTKKNWN5NJPof66yNsB8kciYm",
        "3GeCGyR91UZjgVwyugppEFikvW5TBrPq41X31drdvYzg",
        "FHfxE3i8J9K4wy3wFyMSgL83akSxCGxBCQujdatGhv8d",
        "J4ViQECYsvWQBMdCw5Pg9gkW1iZDQoSQFMZpGweekKBC",
        "Dx7uG7ssZLz8V7FVxtNHCrmud6WAzqeo3vrCAzwNxxbF",
        "BJms3VvaapQC5EoRDuDEDiNdACBTZsufFjeWSamjK8p1",
        "4iQR2sJouvDs7E8ni7ggxxan5vHniKZ73vkG8JJ5inFc",
        "GwWmRtNf63forQ9JxmohqcKR3GnJEQ7qyxzxyPo7VRzM",
        "EVb4NMhEZG6nTmXpt4dpu1N4a9yzEN3o9M6CqQBLSZUh",
        "C63xTYbqMHu3mf92TLcK1vEBPScWbPLNrUTNRc3bMJgB",
        "8Zo5VzxKdvMCuPgwKYMtVfd4FMZW9nFaKwYA5RWPVZsu",
        "EXFDwFtfWUWPcEa1898APAGF2MEFGwhyCpMnNYU7Taa7",
        "6eyBRzmRX69kTVu7oEL5PhT1bUo7wxqwWRWQWaT4tmFE",
        "BYp6fjadB32Mw15V9JXgmutj2VBJEeoMy8FXr8SiPbFe",
        "3Uo11HWYJ178RTVu2Sr8qz3ik8nnd5UHmt28eosWEDzo",
        "GzBsmfrGyJjoyYuzPPBfGc6EkHRW1gCks9sD9BqiNZC",
        "EiSJgphY7AuQUo4L6gc3p82RvDhVJiCHQPE25QKhenp3",
        "GU8ocSrqFMQLmx99hbuAw2wPJeBkCe652zxhXpPiY6yd",
        "7eQES8767qYbhKM6PZipTXnQazwu87KrEFZNQAGF9a4B",
        "5zH7d4Z5PAeYqxRq9Dadd6QDfTGRtkeEkNVXzbTL8BqP",
        "AyDnBs2TTDxL25zC6mJdBxJjwKZYHy9VPWewcj1EALf6",
        "2HA2VJBJtqXXPFZsYnEmrA4Fx4mu9CYnGQXZkqMSuW8H",
        "7njVb4w8NVVTwLmmnqvxmQUJPMP1KStpTgQx9vGmhmG6",
        "FU7Wc644oG1agja1PZvTD1ynQUkmT7PC1hP3w6ZWU1Do",
        "CHBzd5E4FV5gXsrqPDsHj3kNtUFuSGhNfLpScwhQBa11",
        "5prS2zy8HnMECr5qLVJtugZvwyrDQKbjvCaHPmjEVUiC",
        "9hrb3C9cedCYs6oscfVJuLHtRA65MFu2w1NvKGd324Jd",
        "4b8CBBjx2BtU6iuG7QwRjCZ3VTAN9SQKkauS8wSojFLB",
        "2cUiNpkrfmeBB3W6fvSYnsUR5fWdR44QVVYp1fgBj4XA",
        "C5KT6fdYEuHjuEALR43U1ZB5qonNyLck8tAamypjVAYS",
        "F4YAkycFWMUjrBdVzuib4xsVmHN6KAtqecwjXXoLYyiP",
        "7BVsPnqQoX6afVYBkfyT4NQKTNZnXPsjsLExS4hgwTgS",
        "5y445Y2Ba2QYu3Ah4ca8i1GLjctTSX2uKZtZkADD5fTn",
        "DUyj2RycNtCxEVMDY3XNW4ZznzdrtYjMFd6FP1pTwmRh",
        "mafJ5W26Ro6UE1S8sdQDoBpo2xMrEXspVsmMezo8Nx8",
        "5uV4JfA2U8P31E3fLrJ88rqTdSTezjWE5coQt2Szouqg"
      ],
    },
    
  ];

  const { metaplex } = useMetaplex();
  const wallet = useWallet();

  const [nft, setNft] = useState(null);

  const [isLive, setIsLive ] = useState(true)
  const [hasEnded, setHasEnded ] = useState(false)
  const [addressGateAllowedToMint, setAddressGateAllowedToMint ] = useState(true)
  const [mintLimitReached, setMintLimitReached ] = useState(false)
  const [hasEnoughSol, setHasEnoughSol ] = useState(true)
  const [hasEnoughSolForFreeze, setHasEnoughSolForFreeze ] = useState(true)
  const [nftGatePass, setNftGatePass ] = useState(true)
  const [missingNftBurnForPayment, setMissingNftBurnForPayment ] = useState(false)
  const [missingNftForPayment, setMissingNftForPayment ] = useState(false)
  const [isSoldOut, setIsSoldOut ] = useState(false)
  const [noSplTokenToBurn, setNoSplTokenToBurn ] = useState(false)
  const [splTokenGatePass, setSplTokenGatePass ] = useState(true)
  const [noSplTokenToPay, setNoSplTokenToPay ] = useState(false)
  const [noSplTokenForFreeze, setNoSplTokenForFreeze ] = useState(false)
  const [disableMint, setDisableMint] = useState(true);
  const [isMaxRedeemed, setIsMaxRedeemed] = useState(false);
  const [mintingInProgress, setMintingInProgress] = useState(false);

  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(DEFAULT_GUARD_NAME);
  const [candyMachineLoaded, setCandyMachineLoaded] = useState(false);

  const candyMachineAddress = new PublicKey(
    process.env.NEXT_PUBLIC_CANDY_MACHINE_ID
  );
  let candyMachine;
  let walletBalance;

  const getGuard = (selectedGroup, candyMachine) => {
    if (selectedGroup == DEFAULT_GUARD_NAME) {
      return candyMachine.candyGuard.guards;
    }

    const group = candyMachine.candyGuard.groups.find((group) => {
      return group.label == selectedGroup;
    });

    if (!group) {
      console.error(selectedGroup + " group not found. Defaulting to public");
      return candyMachine.candyGuard.guards;
    }

    return group.guards;
  };

  useEffect(() => {
    if (mintingInProgress) {
      return;
    }
    checkEligibility();
  }, [selectedGroup, mintingInProgress])

  const addListener = async () => {
    // The below listeners were getting too noisy, and resulting in 429's from Solana endpoints.
    // Turning them off for now as a workaround until a more stable release is out from Metaplex

    // add a listener to monitor changes to the candy guard
    // metaplex.connection.onAccountChange(candyMachine.candyGuard.address,
    //   () => checkEligibility()
    // );

    // add a listener to monitor changes to the user's wallet
    // metaplex.connection.onAccountChange(metaplex.identity().publicKey,
    //   () => checkEligibility()
    // );

    // add a listener to reevaluate if the user is allowed to mint if startDate is reached
    const slot = await metaplex.connection.getSlot();
    const solanaTime = await metaplex.connection.getBlockTime(slot);
    const startDateGuard = getGuard(selectedGroup, candyMachine).startDate;
    if (startDateGuard != null) {
      const candyStartDate = startDateGuard.date.toString(10);
      const refreshTime = candyStartDate - solanaTime.toString(10);
      if (refreshTime > 0) {
        setTimeout(() => checkEligibility(), refreshTime * 1000);
      }
    }

    // also reevaluate eligibility after endDate is reached
    const endDateGuard = getGuard(selectedGroup, candyMachine).endDate;
    if (endDateGuard != null) {
      const candyEndDate = endDateGuard.date.toString(10);
      const refreshTime = solanaTime.toString(10) - candyEndDate;
      if (refreshTime > 0) {
        setTimeout(() => checkEligibility(), refreshTime * 1000);
      }
    }
  };

  const checkEligibility = async () => {
    //wallet not connected?
    if (!wallet.connected) {
      setDisableMint(true);
      return;
    }

    // read candy machine state from chain
    candyMachine = await metaplex
      .candyMachines()
      .findByAddress({ address: candyMachineAddress });
    
    setCandyMachineLoaded(true);

    const guardGroups = candyMachine.candyGuard.groups.map((group) => {
      return group.label;
    });
    if (groups.join(",") != guardGroups.join(",")) {
      setGroups(guardGroups);
      if (selectedGroup === DEFAULT_GUARD_NAME) {
        setSelectedGroup(guardGroups[0]);
      }
    }

    // enough items available?
    if (
      candyMachine.itemsMinted.toString(10) -
      candyMachine.itemsAvailable.toString(10) >=
      0
    ) {
      console.error("not enough items available");
      setDisableMint(true);
      setIsSoldOut(true);
      return;
    }

    // guard checks have to be done for the relevant guard group! Example is for the default groups defined in Part 1 of the CM guide
    const guard = getGuard(selectedGroup, candyMachine);

    // Calculate current time based on Solana BlockTime which the on chain program is using - startTime and endTime guards will need that
    const slot = await metaplex.connection.getSlot();
    const solanaTime = await metaplex.connection.getBlockTime(slot);

    if (guard.startDate != null) {
      const candyStartDate = guard.startDate.date.toString(10);
      if (solanaTime < candyStartDate) {
        console.error("startDate: CM not live yet");
        setDisableMint(true);
        setIsLive(false);
        return;
      }
    }

    if (guard.endDate != null) {
      const candyEndDate = guard.endDate.date.toString(10);
      if (solanaTime > candyEndDate) {
        console.error("endDate: CM not live anymore");
        setDisableMint(true);
        setHasEnded(true);
        return;
      }
    }

    if (guard.addressGate != null) {
      if (metaplex.identity().publicKey.toBase58() != guard.addressGate.address.toBase58()) {
        console.error("addressGate: You are not allowed to mint");
        setDisableMint(true);
        setAddressGateAllowedToMint(false)
        return;
      }
    }

    if (guard.mintLimit != null) {
      const mitLimitCounter = metaplex.candyMachines().pdas().mintLimitCounter({
        id: guard.mintLimit.id,
        user: metaplex.identity().publicKey,
        candyMachine: candyMachine.address,
        candyGuard: candyMachine.candyGuard.address,
      });
      //Read Data from chain
      const mintedAmountBuffer = await metaplex.connection.getAccountInfo(mitLimitCounter, "processed");
      let mintedAmount;
      if (mintedAmountBuffer != null) {
        mintedAmount = mintedAmountBuffer.data.readUintLE(0, 1);
      }
      if (mintedAmount != null && mintedAmount >= guard.mintLimit.limit) {
        console.error("mintLimit: mintLimit reached!");
        setDisableMint(true);
        setMintLimitReached(true);
        return;
      }
    }

    if (guard.solPayment != null) {
      walletBalance = await metaplex.connection.getBalance(
        metaplex.identity().publicKey
      );

      const costInLamports = guard.solPayment.amount.basisPoints.toString(10);

      if (costInLamports > walletBalance) {
        console.error("solPayment: Not enough SOL!");
        setDisableMint(true);
        setHasEnoughSol(false);
        return;
      }
    }

    if (guard.freezeSolPayment != null) {
      walletBalance = await metaplex.connection.getBalance(
        metaplex.identity().publicKey
      );

      const costInLamports = guard.freezeSolPayment.amount.basisPoints.toString(10);

      if (costInLamports > walletBalance) {
        console.error("freezeSolPayment: Not enough SOL!");
        setDisableMint(true);
        setHasEnoughSolForFreeze(false);
        return;
      }
    }

    if (guard.nftGate != null) {
      const ownedNfts = await metaplex.nfts().findAllByOwner({ owner: metaplex.identity().publicKey });
      const nftsInCollection = ownedNfts.filter(obj => {
        return (obj.collection?.address.toBase58() === guard.nftGate.requiredCollection.toBase58()) && (obj.collection?.verified === true);
      });
      if (nftsInCollection.length < 1) {
        console.error("nftGate: The user has no NFT to pay with!");
        setDisableMint(true);
        setNftGatePass(false);
        return;
      }
    }

    if (guard.nftBurn != null) {
      const ownedNfts = await metaplex.nfts().findAllByOwner({ owner: metaplex.identity().publicKey });
      const nftsInCollection = ownedNfts.filter(obj => {
        return (obj.collection?.address.toBase58() === guard.nftBurn.requiredCollection.toBase58()) && (obj.collection?.verified === true);
      });
      if (nftsInCollection.length < 1) {
        console.error("nftBurn: The user has no NFT to pay with!");
        setDisableMint(true);
        setMissingNftBurnForPayment(true);
        return;
      }
    }

    if (guard.nftPayment != null) {
      const ownedNfts = await metaplex.nfts().findAllByOwner({ owner: metaplex.identity().publicKey });
      const nftsInCollection = ownedNfts.filter(obj => {
        return (obj.collection?.address.toBase58() === guard.nftPayment.requiredCollection.toBase58()) && (obj.collection?.verified === true);
      });
      if (nftsInCollection.length < 1) {
        console.error("nftPayment: The user has no NFT to pay with!");
        setDisableMint(true);
        setMissingNftForPayment(true);
        return;
      }
    }

    if (guard.redeemedAmount != null) {
      if (guard.redeemedAmount.maximum.toString(10) <= candyMachine.itemsMinted.toString(10)) {
        console.error("redeemedAmount: Too many NFTs have already been minted!");
        setDisableMint(true);
        setIsMaxRedeemed(true);
        return;
      }
    }

    if (guard.tokenBurn != null) {
      const ata = await metaplex.tokens().pdas().associatedTokenAccount({ mint: guard.tokenBurn.mint, owner: metaplex.identity().publicKey });
      const balance = await metaplex.connection.getTokenAccountBalance(ata);
      if (balance < guard.tokenBurn.amount.basisPoints.toNumber()) {
        console.error("tokenBurn: Not enough SPL tokens to burn!");
        setDisableMint(true);
        setNoSplTokenToBurn(true);
        return;
      }
    }

    if (guard.tokenGate != null) {
      const ata = await metaplex.tokens().pdas().associatedTokenAccount({ mint: guard.tokenGate.mint, owner: metaplex.identity().publicKey });
      const balance = await metaplex.connection.getTokenAccountBalance(ata);
      if (balance < guard.tokenGate.amount.basisPoints.toNumber()) {
        console.error("tokenGate: Not enough SPL tokens!");
        setDisableMint(true);
        setSplTokenGatePass(false);
        return;
      }
    }

    if (guard.tokenPayment != null) {
      const ata = await metaplex.tokens().pdas().associatedTokenAccount({ mint: guard.tokenPayment.mint, owner: metaplex.identity().publicKey });
      const balance = await metaplex.connection.getTokenAccountBalance(ata);
      if (balance < guard.tokenPayment.amount.basisPoints.toNumber()) {
        console.error("tokenPayment: Not enough SPL tokens to pay!");
        setDisableMint(true);
        setNoSplTokenToPay(true);
        return;
      }
      if (guard.freezeTokenPayment != null) {
        const ata = await metaplex.tokens().pdas().associatedTokenAccount({ mint: guard.freezeTokenPayment.mint, owner: metaplex.identity().publicKey });
        const balance = await metaplex.connection.getTokenAccountBalance(ata);
        if (balance < guard.tokenPayment.amount.basisPoints.toNumber()) {
          console.error("freezeTokenPayment: Not enough SPL tokens to pay!");
          setDisableMint(true);
          setNoSplTokenForFreeze(true);
          return;
        }
      }
    }

    //good to go! Allow them to mint
    setDisableMint(false);
    setIsLive(true)
    setHasEnded(false)
    setAddressGateAllowedToMint(true)
    setMintLimitReached(false)
    setHasEnoughSol(true)
    setHasEnoughSolForFreeze(true)
    setNftGatePass(true)
    setMissingNftBurnForPayment(false)
    setMissingNftForPayment(false)
    setIsSoldOut(false)
    setNoSplTokenToBurn(false)
    setSplTokenGatePass(true)
    setNoSplTokenToPay(false)
    setNoSplTokenForFreeze(false)
    setIsMaxRedeemed(false);
  };

  // show and do nothing if no wallet is connected
  if (!wallet.connected) {
    return null;
  }

  // if it's the first time we are processing this function with a connected wallet we read the CM data and add Listeners
  if (candyMachine === undefined) {
    (async () => {
      // read candy machine data to get the candy guards address
      await checkEligibility();
      // Add listeners to refresh CM data to reevaluate if minting is allowed after the candy guard updates or startDate is reached
      addListener();
    }
    )();
  }

  const onClick = async () => {
    setMintingInProgress(true);

    try {
      // Here the actual mint happens. Depending on the guards that you are using you have to run some pre validation beforehand 
      // Read more: https://docs.metaplex.com/programs/candy-machine/minting#minting-with-pre-validation
      await mintingGroupAllowlistCheck();

      const group = selectedGroup == DEFAULT_GUARD_NAME ? undefined : selectedGroup;
      const { nft } = await metaplex.candyMachines().mint({
        candyMachine,
        collectionUpdateAuthority: candyMachine.authorityAddress,
        ...group && { group },
      });

      setNft(nft);
    } catch(e) {
      throw e;
    } finally {
      setMintingInProgress(false);
    }
  };

  const mintingGroupAllowlistCheck = async () => {
    const group = selectedGroup == DEFAULT_GUARD_NAME ? undefined : selectedGroup;

    const guard = getGuard(selectedGroup, candyMachine);
    if (!guard.allowList) {
      return;
    }

    const groupDetails = allowList.find((group) => {
      return group.groupName == selectedGroup;
    });

    if (!groupDetails) {
      throw new Error(`Cannot mint, as no list of accounts provided for group ${selectedGroup} with allowlist settings enabled`)
    }

    const mintingWallet = metaplex.identity().publicKey.toBase58();

    try {
      await metaplex.candyMachines().callGuardRoute({
        candyMachine,
        guard: 'allowList',
        settings: {
          path: 'proof',
          merkleProof: getMerkleProof(groupDetails.wallets, mintingWallet),
        },
        ...group && { group },
      });
    } catch (e) {
      console.error(`MerkleTreeProofMismatch: Wallet ${mintingWallet} is not allowlisted for minting in the group ${selectedGroup}`);
      throw e;
    }
  }

  const onGroupChanged = (event) => {
    setSelectedGroup(event.target.value);
  };

  const status = candyMachineLoaded && (
    <div className={styles.container}>
      { (isLive && !hasEnded) && <h1 className={styles.title}>Minting Live!</h1> }
      { (isLive && hasEnded) && <h1 className={styles.title}>Minting End!</h1> }
      { !isLive && <h1 className={styles.title}>Minting Not Live!</h1> }
      { !addressGateAllowedToMint && <h1 className={styles.title}>Wallet address not allowed to mint</h1> }
      { mintLimitReached && <h1 className={styles.title}>Minting limit reached</h1> }
      { (!hasEnoughSol || !hasEnoughSolForFreeze) && <h1 className={styles.title}>Insufficient SOL balance</h1> }
      { (!nftGatePass || missingNftBurnForPayment || missingNftForPayment) && <h1 className={styles.title}>Missing required NFT for minting</h1> }
      { isSoldOut && <h1 className={styles.title}>Sold out!</h1> }
      { isMaxRedeemed && <h1 className={styles.title}>Maximum amount of NFTs allowed to be minted has already been minted!</h1> }
      { (!splTokenGatePass || noSplTokenToBurn || noSplTokenToPay || noSplTokenForFreeze) && <h1 className={styles.title}>Missing required SPL token for minting</h1> }
    </div>
  );

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.inlineContainer}>
          <h1 className={styles.title}>Network: </h1>
          <select onChange={onClusterChange} className={styles.dropdown}>
            <option value="devnet">Devnet</option>
            <option value="mainnet">Mainnet</option>
            <option value="testnet">Testnet</option>
          </select>
        </div>
        {
          groups.length > 0 &&
          (
            <div className={styles.inlineContainer}>
              <h1 className={styles.title}>Minting Group: </h1>
              <select onChange={onGroupChanged} className={styles.dropdown} defaultValue={selectedGroup}>
                {
                  groups.map(group => {
                    return (
                      <option key={group} value={group}>{group}</option>
                    );
                  })
                }
              </select>
            </div>
          )
        }
      </div>
      <div>
        <div className={styles.container}>
          <h1 className={styles.title}>NFT Mint Address: {nft ? nft.mint.address.toBase58() : "Nothing Minted yet"}</h1>
          { disableMint && status }
          { mintingInProgress && <h1 className={styles.title}>Minting In Progress!</h1> }
          <div className={styles.nftForm}>
            {
              !disableMint && !mintingInProgress && (
                <button onClick={onClick} disabled={disableMint}>
                  Mint NFT
                </button>
              )
            }
          </div>
          {nft && (
            <div className={styles.nftPreview}>
              <h1>{nft.name}</h1>
              <img
                src={nft?.json?.image || "/fallbackImage.jpg"}
                alt="The downloaded illustration of the provided NFT address."
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
