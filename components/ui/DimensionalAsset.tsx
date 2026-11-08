"use client";

import { useId } from "react";

export type DimensionalAssetKind =
  "capture" | "vault" | "compute" | "network" | "cloud" | "review";

type DimensionalAssetProps = {
  kind: DimensionalAssetKind;
  className?: string;
};

/** Material studies for architecture diagrams. Labels live in the surrounding HTML. */
export function DimensionalAsset({ kind, className }: DimensionalAssetProps) {
  const instanceId = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const id = (name: string) => `dimensional-${instanceId}-${name}`;
  const material = (name: string) => `url(#${id(name)})`;

  return (
    <svg
      className={className}
      viewBox="0 0 320 250"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient
          id={id("porcelain")}
          x1="75"
          y1="40"
          x2="237"
          y2="190"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FBFBEB" />
          <stop offset=".45" stopColor="#DCE6D6" />
          <stop offset="1" stopColor="#94ADA0" />
        </linearGradient>
        <linearGradient
          id={id("emerald")}
          x1="91"
          y1="43"
          x2="236"
          y2="186"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#5E9684" />
          <stop offset=".43" stopColor="#264F43" />
          <stop offset="1" stopColor="#102C25" />
        </linearGradient>
        <linearGradient
          id={id("left")}
          x1="77"
          y1="105"
          x2="175"
          y2="192"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#456F5D" />
          <stop offset=".44" stopColor="#284B3D" />
          <stop offset="1" stopColor="#17342B" />
        </linearGradient>
        <linearGradient
          id={id("right")}
          x1="156"
          y1="136"
          x2="245"
          y2="181"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#1E3F34" />
          <stop offset="1" stopColor="#091E19" />
        </linearGradient>
        <linearGradient
          id={id("glass")}
          x1="104"
          y1="40"
          x2="219"
          y2="175"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#E7FFF0" stopOpacity=".65" />
          <stop offset=".32" stopColor="#A1D6BF" stopOpacity=".16" />
          <stop offset=".67" stopColor="#7CA58F" stopOpacity=".32" />
          <stop offset="1" stopColor="#ECFFF3" stopOpacity=".5" />
        </linearGradient>
        <linearGradient
          id={id("edge")}
          x1="85"
          y1="40"
          x2="239"
          y2="189"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F3FFF1" stopOpacity=".95" />
          <stop offset=".48" stopColor="#BAE5CF" stopOpacity=".5" />
          <stop offset="1" stopColor="#4C7964" stopOpacity=".28" />
        </linearGradient>
        <linearGradient
          id={id("copper")}
          x1="85"
          y1="50"
          x2="233"
          y2="176"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F0D8AD" />
          <stop offset=".3" stopColor="#C99561" />
          <stop offset=".62" stopColor="#875630" />
          <stop offset=".84" stopColor="#E0B987" />
          <stop offset="1" stopColor="#A46D43" />
        </linearGradient>
        <linearGradient
          id={id("barrel")}
          x1="89"
          y1="110"
          x2="231"
          y2="110"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#1B3D30" />
          <stop offset=".22" stopColor="#426D56" />
          <stop offset=".46" stopColor="#315E49" />
          <stop offset=".72" stopColor="#153A2C" />
          <stop offset="1" stopColor="#0B241C" />
        </linearGradient>
        <radialGradient id={id("shadow")}>
          <stop stopColor="#09251A" stopOpacity=".35" />
          <stop offset=".45" stopColor="#153F2C" stopOpacity=".15" />
          <stop offset="1" stopColor="#153F2C" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={id("light")}>
          <stop stopColor="#E5F9D9" />
          <stop offset=".38" stopColor="#BDDEC4" />
          <stop offset="1" stopColor="#5C9077" />
        </radialGradient>
        <filter
          id={id("contact")}
          x="-30%"
          y="-40%"
          width="160%"
          height="190%"
          colorInterpolationFilters="sRGB"
        >
          <feDropShadow
            dx="0"
            dy="7"
            stdDeviation="5"
            floodColor="#08251B"
            floodOpacity=".22"
          />
        </filter>
      </defs>

      <ellipse cx="160" cy="211" rx="121" ry="30" fill={material("shadow")} />
      <path
        d="M49 196 160 137 271 196 160 255Z"
        stroke="#6F9780"
        strokeOpacity=".12"
      />

      {kind === "capture" && (
        <g>
          <path
            d="m93 157 76 42 63-124v10l-62 125-77-43Z"
            fill={material("right")}
          />
          <path d="m93 157 76 42v11l-76-43Z" fill={material("left")} />
          <path
            d="m93 157 63-124 76 42-63 124Z"
            fill={material("porcelain")}
            stroke={material("edge")}
            strokeWidth="1.2"
          />
          <path
            d="m102 154 58-112 63 35-56 112Z"
            fill="#0B241D"
            stroke="#719583"
            strokeWidth=".8"
          />
          <path d="m110 147 51-99 54 30-49 99Z" fill={material("emerald")} />
          <path
            d="m111 147 50-98 53 29-49 99Z"
            fill={material("glass")}
            opacity=".52"
          />
          <path
            d="m121 139 37-74 38 21-37 74Z"
            stroke="#C3E5CB"
            strokeOpacity=".35"
            strokeWidth=".7"
          />
          <g stroke="#E0F2D7" strokeWidth=".8" opacity=".56">
            <path d="m147 86 10-20 12 7m14 8 12 6-10 20m-13 27-12 24-12-7m-14-8-12-7 11-23" />
            <path d="m151 103 17 10m-4-21-10 22" />
          </g>
          <path
            d="m137 118 36 20"
            stroke={material("copper")}
            strokeWidth="2"
          />
          <path d="m129 130 13 7m5 3 12 7" stroke="#A3C0AE" strokeWidth="1.5" />
          <path
            d="m145 186 12 7"
            stroke="#657F71"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="m185 57 10 5"
            stroke="#667F6E"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="180" cy="54" r="1.7" fill="#234737" />
          <path
            d="m208 129 7-14m-12 24 2-4"
            stroke={material("copper")}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="m95 157 74 41 62-123"
            stroke="#F0F4DB"
            strokeOpacity=".7"
            strokeWidth=".8"
          />
          <g className="asset-floating-layer">
            <path
              d="m54 124 27-14 28 15v29l-28 15-27-15Z"
              fill={material("right")}
            />
            <path d="m54 124 27 15v30l-27-15Z" fill={material("left")} />
            <path
              d="m54 124 27-14 28 15-28 14Z"
              fill={material("porcelain")}
              stroke={material("edge")}
              strokeWidth=".7"
            />
            <ellipse
              cx="81"
              cy="125"
              rx="13"
              ry="7"
              fill="#183E30"
              stroke={material("copper")}
              strokeWidth="1.4"
            />
            <ellipse
              cx="81"
              cy="124"
              rx="7"
              ry="3.5"
              fill={material("light")}
            />
            <path
              d="m61 137 11 6m-11-1 11 6m-11-1 11 6"
              stroke="#92B09A"
              strokeOpacity=".6"
              strokeWidth="1"
            />
            <path
              d="m86 148 15-8"
              stroke={material("copper")}
              strokeWidth="1.7"
            />
            <path
              d="M72 102c5-4 13-4 18 0m-23-7c8-6 21-6 29 0"
              stroke="#54856B"
              strokeWidth="1.2"
              strokeLinecap="round"
              opacity=".65"
            />
          </g>
          <path
            d="m201 188 27-14 24 13-27 15Z"
            fill={material("glass")}
            stroke="#8EAF98"
            strokeOpacity=".55"
          />
          <path
            d="m214 187 9 5 13-7"
            stroke={material("copper")}
            strokeWidth="1.4"
          />
        </g>
      )}

      {kind === "vault" && (
        <g>
          <path
            d="m80 180 80-42 80 42v10l-80 42-80-42Z"
            fill={material("right")}
          />
          <path
            d="m80 180 80-42 80 42-80 42Z"
            fill={material("porcelain")}
            stroke={material("edge")}
          />
          <ellipse
            cx="160"
            cy="178"
            rx="70"
            ry="26"
            fill="#123B2C"
            opacity=".2"
          />
          {[139, 101, 63].map((y, index) => (
            <g key={y}>
              <path
                d={`M92 ${y}a68 26 0 0 0 136 0v25a68 26 0 0 1-136 0Z`}
                fill={material("barrel")}
              />
              <ellipse
                cx="160"
                cy={y}
                rx="68"
                ry="26"
                fill={index === 2 ? material("porcelain") : material("emerald")}
                stroke={material("edge")}
                strokeWidth="1"
              />
              <ellipse
                cx="160"
                cy={y}
                rx="55"
                ry="20"
                stroke={index === 2 ? "#7D9B87" : "#A8C3AC"}
                strokeOpacity=".42"
                strokeWidth=".6"
              />
              <path
                d={`M94 ${y + 22}a66 24 0 0 0 132 0`}
                stroke={material("copper")}
                strokeWidth="1.1"
              />
              <path
                d={`M99 ${y + 11}c10 8 30 14 49 15`}
                stroke="#B6D5B8"
                strokeOpacity=".27"
                strokeWidth=".8"
              />
              <path
                d={`M110 ${y + 13}v7m5-4v7m5-5v7m5-5v7`}
                stroke="#A2BFA2"
                strokeOpacity=".55"
                strokeWidth="1"
              />
              <circle cx="205" cy={y + 17} r="1.7" fill="#D5E5BD" />
              <circle cx="211" cy={y + 14} r="1.3" fill="#9DBA93" />
            </g>
          ))}
          <g stroke="#688A72" strokeWidth=".65" opacity=".7">
            <path d="m119 56 20 10 26-14 24 13m-58 10 29-15 30 15m-37-30v8m31 1 13 6" />
            <circle cx="119" cy="56" r="2" />
            <circle cx="190" cy="75" r="2" />
          </g>
          <g className="asset-floating-layer">
            <path
              d="M115 30c0-9 20-16 45-16s45 7 45 16v5c0 9-20 16-45 16s-45-7-45-16Z"
              fill={material("glass")}
            />
            <ellipse
              cx="160"
              cy="30"
              rx="45"
              ry="16"
              fill={material("glass")}
              stroke={material("edge")}
              strokeWidth="1"
            />
            <ellipse
              cx="160"
              cy="30"
              rx="34"
              ry="11"
              stroke={material("copper")}
              strokeWidth=".8"
            />
            <path
              d="m145 28 11 6 19-10"
              stroke="#426A50"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <path
            d="M83 102v54m154-54v54"
            stroke="#839E84"
            strokeWidth=".8"
            strokeDasharray="2 5"
            opacity=".4"
          />
        </g>
      )}

      {kind === "compute" && (
        <g>
          <path
            d="m62 151 98-52 98 52v13l-98 52-98-52Z"
            fill={material("right")}
          />
          <path d="m62 151 98 52v13l-98-52Z" fill={material("left")} />
          <path
            d="m62 151 98-52 98 52-98 52Z"
            fill={material("porcelain")}
            stroke={material("edge")}
          />
          <g stroke="#8EA38A" strokeWidth=".8">
            <path d="m73 151 25-13 20 11m-32 8 14-7 17 9m-20 4 21-11m86-18 22 12 13-7m-33 17 15 8 21-11m-102 38 13-7-10-5m24 11 20-10 14 7" />
          </g>
          <g stroke={material("copper")} strokeWidth="3" strokeLinecap="square">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <g key={i}>
                <path d={`m${101 + i * 9} ${143 + i * 4.8} -10 5.3`} />
                <path d={`m${171 + i * 9} ${169 - i * 4.8} 10 5.3`} />
                <path d={`m${101 + i * 9} ${123 - i * 4.8} -10 -5.3`} />
                <path d={`m${171 + i * 9} ${98 + i * 4.8} 10 -5.3`} />
              </g>
            ))}
          </g>
          <path
            d="m96 126 64-34 64 34v20l-64 34-64-34Z"
            fill={material("right")}
          />
          <path d="m96 126 64 34v20l-64-34Z" fill={material("left")} />
          <path
            d="m96 126 64-34 64 34-64 34Z"
            fill={material("emerald")}
            stroke={material("edge")}
          />
          <path
            d="m110 126 50-26 50 26-50 26Z"
            stroke={material("copper")}
            strokeWidth="1.6"
          />
          <path
            d="m126 126 34-18 34 18-34 18Z"
            fill={material("porcelain")}
            stroke="#EAF0D8"
            strokeWidth=".8"
          />
          <path d="m139 126 21-11 21 11-21 11Z" fill={material("emerald")} />
          <path d="m149 126 11-6 11 6-11 6Z" fill={material("light")} />
          <path
            d="m103 143 57 30 57-30"
            stroke="#A1B99B"
            strokeOpacity=".4"
            strokeWidth=".7"
          />
          <g className="asset-floating-layer">
            <path
              d="m87 74 73-39 73 39v5l-73 39-73-39Z"
              fill={material("glass")}
            />
            <path
              d="m87 74 73-39 73 39-73 39Z"
              fill={material("glass")}
              stroke={material("edge")}
              strokeWidth="1.1"
            />
            <path
              d="m98 74 62-33 62 33-62 33Z"
              stroke="#F1F9DE"
              strokeOpacity=".6"
              strokeWidth=".6"
            />
            <g stroke="#90AF92" strokeOpacity=".65" strokeWidth=".8">
              <path d="m117 74 43-23 43 23-43 23Zm14 0 29-15 29 15-29 15Z" />
              <path d="m160 42 0 12m-61 20 20 0m83 0h20m-62 20v12" />
            </g>
            <path d="m146 74 14-7 14 7-14 7Z" fill={material("light")} />
          </g>
          <path
            d="M112 99v17m96-17v17M160 119v10"
            stroke={material("copper")}
            strokeWidth="1"
            strokeDasharray="2 3"
            opacity=".7"
          />
        </g>
      )}

      {kind === "network" && (
        <g>
          <path
            d="m56 183 105-55 105 55-105 56Z"
            fill={material("glass")}
            stroke="#91AF98"
            strokeOpacity=".45"
          />
          <path
            d="m71 183 90-47 90 47-90 48Z"
            stroke="#90AA91"
            strokeOpacity=".3"
            strokeWidth=".7"
          />
          <g strokeLinecap="round" strokeLinejoin="round">
            <path
              d="m68 140 55-63 45 51 77-39m-77 39 60 56-103-107m-57 63 160 44m-105-107 122 12"
              stroke="#0F3528"
              strokeOpacity=".23"
              strokeWidth="7"
              transform="translate(0 7)"
            />
            <path
              d="m68 140 55-63 45 51 77-39m-77 39 60 56-103-107m-57 63 160 44m-105-107 122 12"
              stroke={material("copper")}
              strokeWidth="3"
            />
            <path
              d="m68 139 55-63 45 51 77-39m-77 39 60 56"
              stroke="#E6D0A5"
              strokeWidth=".8"
            />
            <path
              d="m68 140 100-12m-45-51 105 107m17-95-17 95"
              stroke="#6F9D82"
              strokeOpacity=".6"
              strokeWidth="1"
            />
          </g>
          {[
            { x: 68, y: 132, s: 22 },
            { x: 123, y: 68, s: 23 },
            { x: 245, y: 81, s: 21 },
            { x: 228, y: 175, s: 25 },
          ].map(({ x, y, s }) => (
            <g key={x}>
              <ellipse
                cx={x}
                cy={y + 24}
                rx={s}
                ry="9"
                fill={material("shadow")}
              />
              <path
                d={`m${x - s} ${y} ${s} ${s * 0.52} ${s} ${-s * 0.52}v12l${-s} ${s * 0.52}-${s}-${s * 0.52}Z`}
                fill={material("right")}
              />
              <path
                d={`m${x - s} ${y} ${s} ${s * 0.52}v12l${-s}-${s * 0.52}Z`}
                fill={material("left")}
              />
              <path
                d={`m${x - s} ${y} ${s}-${s * 0.52} ${s} ${s * 0.52}-${s} ${s * 0.52}Z`}
                fill={material("porcelain")}
                stroke={material("edge")}
              />
              <ellipse
                cx={x}
                cy={y}
                rx="9"
                ry="4.5"
                fill={material("emerald")}
                stroke={material("copper")}
                strokeWidth="1"
              />
              <ellipse cx={x} cy={y - 1} rx="4" ry="2" fill="#DEEFCE" />
            </g>
          ))}
          <g className="asset-floating-layer" filter={material("contact")}>
            <path
              d="m168 65 35 49-35 40-35-40Z"
              fill={material("emerald")}
              stroke={material("edge")}
              strokeWidth=".8"
            />
            <path d="m168 65 0 68-35-19Z" fill={material("glass")} />
            <path
              d="m168 65 35 49-35 19Z"
              fill={material("porcelain")}
              opacity=".82"
            />
            <path d="m133 114 35 19v21Z" fill="#3D6F50" />
            <path d="m168 133 35-19-35 40Z" fill="#143E2B" />
            <path
              d="m168 65 0 89m-35-40 35 19 35-19"
              stroke="#E0E9CD"
              strokeOpacity=".8"
              strokeWidth=".8"
            />
            <path
              d="m168 84 20 29-20 12-20-12Z"
              stroke={material("copper")}
              strokeWidth=".9"
            />
          </g>
          <g fill="#D1C69A">
            <circle cx="96" cy="108" r="2.2" />
            <circle cx="207" cy="108" r="2.2" />
            <circle cx="151" cy="163" r="2.2" />
          </g>
        </g>
      )}

      {kind === "cloud" && (
        <g>
          <path
            d="M81 103v87l79 42 79-42v-87"
            stroke={material("copper")}
            strokeWidth="2"
          />
          {[132, 85, 38].map((y, index) => (
            <g
              key={y}
              className={index === 2 ? "asset-floating-layer" : undefined}
            >
              <path
                d={`m72 ${y + 43} 88-46 88 46v16l-88 46-88-46Z`}
                fill={material("right")}
              />
              <path
                d={`m72 ${y + 43} 88 46v16l-88-46Z`}
                fill={material("left")}
              />
              <path
                d={`m72 ${y + 43} 88-46 88 46-88 46Z`}
                fill={index === 2 ? material("porcelain") : material("emerald")}
                stroke={material("edge")}
                strokeWidth=".9"
              />
              <path
                d={`m82 ${y + 43} 78-41 78 41-78 41Z`}
                stroke={index === 2 ? "#73977B" : "#ACCAAA"}
                strokeOpacity=".4"
                strokeWidth=".7"
              />
              <path
                d={`m95 ${y + 43} 65 34 65-34`}
                stroke={material("copper")}
                strokeWidth=".9"
              />
              {[0, 1, 2].map((row) => (
                <g key={row}>
                  <path
                    d={`m${111 + row * 19} ${y + 29 + row * 10} 39-20 12 6-39 21Z`}
                    fill={index === 2 ? "#39664F" : "#9CB99B"}
                    fillOpacity={index === 2 ? ".7" : ".2"}
                    stroke={index === 2 ? "#89A78A" : "#97B496"}
                    strokeWidth=".6"
                  />
                  <path
                    d={`m${116 + row * 19} ${y + 29 + row * 10} 25-13`}
                    stroke={material("copper")}
                    strokeWidth=".8"
                  />
                </g>
              ))}
              <path
                d={`m84 ${y + 55} 18 9m-18-5 18 9m7 0 18 9m-18-5 18 9`}
                stroke="#9FB99B"
                strokeOpacity=".52"
                strokeWidth="1"
              />
              <path
                d={`m211 ${y + 70} 20-10`}
                stroke="#0D281D"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d={`m212 ${y + 69} 5-2.5`}
                stroke="#E4E6B5"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d={`m73 ${y + 45} 87 45 87-45`}
                stroke="#B5CCAA"
                strokeOpacity=".28"
                strokeWidth=".7"
              />
            </g>
          ))}
          <path
            d="M160 140v13m0 34v13"
            stroke={material("copper")}
            strokeWidth="1.2"
          />
          <circle cx="160" cy="147" r="2" fill="#D6C798" />
          <circle cx="160" cy="193" r="2" fill="#D6C798" />
        </g>
      )}

      {kind === "review" && (
        <g>
          <path
            d="m77 176 83-44 83 44v12l-83 44-83-44Z"
            fill={material("right")}
          />
          <path d="m77 176 83 44v12l-83-44Z" fill={material("left")} />
          <path
            d="m77 176 83-44 83 44-83 44Z"
            fill={material("porcelain")}
            stroke={material("edge")}
          />
          <path
            d="m92 176 68-36 68 36-68 36Z"
            stroke="#809B80"
            strokeOpacity=".55"
            strokeWidth=".7"
          />
          <path
            d="m119 173 41-22 41 22-41 22Z"
            fill={material("emerald")}
            stroke={material("copper")}
            strokeWidth=".9"
          />
          <path
            d="m138 167 22 12 22-12v18l-22 12-22-12Z"
            fill={material("right")}
          />
          <path d="m138 167 22-12 22 12-22 12Z" fill={material("porcelain")} />
          <g className="asset-floating-layer" filter={material("contact")}>
            <path
              d="M73 97a87 43 0 0 0 174 0v29a87 43 0 0 1-174 0Z"
              fill={material("barrel")}
            />
            <path
              d="M75 121a85 41 0 0 0 170 0"
              stroke={material("copper")}
              strokeWidth="1.3"
            />
            <path
              d="M73 97a87 43 0 1 1 174 0 87 43 0 1 1-174 0Zm35 0a52 25 0 1 0 104 0 52 25 0 1 0-104 0Z"
              fill={material("porcelain")}
              fillRule="evenodd"
              stroke={material("edge")}
              strokeWidth=".9"
            />
            <ellipse
              cx="160"
              cy="97"
              rx="77"
              ry="36"
              stroke={material("copper")}
              strokeWidth="1"
            />
            <path
              d="M108 97a52 25 0 0 1 104 0v14a52 25 0 0 0-104 0Z"
              fill={material("right")}
            />
            <ellipse
              cx="160"
              cy="110"
              rx="52"
              ry="25"
              fill={material("emerald")}
              stroke="#6E9E7B"
              strokeWidth=".7"
            />
            <path
              d="m120 109 40-21 40 21-40 21Z"
              stroke="#9CC69A"
              strokeOpacity=".38"
              strokeWidth=".8"
            />
            <ellipse
              cx="160"
              cy="98"
              rx="51"
              ry="24"
              fill={material("glass")}
              stroke="#E0EDD2"
              strokeOpacity=".48"
              strokeWidth=".8"
            />
            <path d="m134 96 19 10 33-18v7l-33 18-19-10Z" fill="#26543C" />
            <path
              d="m134 96 19 10 33-18"
              stroke={material("copper")}
              strokeWidth="6"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            <path
              d="m134 94 19 10 33-18"
              stroke="#E9DFC0"
              strokeWidth="1.5"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            <path
              d="M94 100a67 29 0 0 1 37-28m56 57a67 29 0 0 0 39-29"
              stroke="#F7F8DD"
              strokeOpacity=".8"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
            <path
              d="m93 129 1 7m5-4 1 7m5-4 1 7m5-4 1 7"
              stroke="#9BBA96"
              strokeOpacity=".6"
              strokeWidth=".8"
            />
            <circle cx="222" cy="138" r="1.7" fill="#DEE5BB" />
          </g>
          <path
            d="M160 45v-9m-8 3h16"
            stroke={material("copper")}
            strokeWidth="1"
            opacity=".7"
          />
        </g>
      )}
    </svg>
  );
}

export default DimensionalAsset;
