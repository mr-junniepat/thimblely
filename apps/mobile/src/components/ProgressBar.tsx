import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';

interface ProgressBarProps {
  /** Current progress value (0-100) */
  progress: number;
  /** Total value for display */
  total: number;
  /** Current paid/achieved value for display */
  current: number;
  /** Label for the progress bar */
  label?: string;
  /** Color of the progress bar */
  color?: string;
  /** Background color of the progress bar */
  backgroundColor?: string;
  /** Height of the progress bar */
  height?: number;
  /** Show percentage text */
  showPercentage?: boolean;
  /** Show current/total values */
  showValues?: boolean;
  /** Custom text color */
  textColor?: string;
  /** Custom percentage text color */
  percentageColor?: string;
}

export default function ProgressBar({
  progress,
  total,
  current,
  label = 'Amount Paid',
  color = '#682476',
  backgroundColor = '#D9D9D9',
  height = 8,
  showPercentage = true,
  showValues = true,
  textColor = '#111113',
  percentageColor = '#111113',
}: ProgressBarProps) {
  return (
    <View>
      {/* Label */}
      {label && (
        <Text
          style={[
            tw`text-sm mb-4`,
            {
              color: textColor,
              fontFamily: 'Satoshi Variable',
            },
          ]}
        >
          {label}
        </Text>
      )}

      {/* Progress Bar */}
      <View
        style={[
          tw`rounded-full mb-4`,
          {
            backgroundColor,
            height,
          },
        ]}
      >
        <View
          style={[
            tw`rounded-full`,
            {
              backgroundColor: color,
              width: `${Math.min(Math.max(progress, 0), 100)}%`,
              height,
            },
          ]}
        />
      </View>

      {/* Progress Info */}
      {showValues && (
        <View style={tw`flex-row justify-between items-center`}>
          <Text
            style={[
              tw`text-sm`,
              {
                color: textColor,
                fontFamily: 'Satoshi Variable',
              },
            ]}
          >
            ${current.toLocaleString()} paid of{' '}
            <Text
              style={[
                tw`font-bold`,
                {
                  color: color,
                  fontFamily: 'Satoshi Variable',
                },
              ]}
            >
              ${total.toLocaleString()}
            </Text>
          </Text>
          {showPercentage && (
            <Text
              style={[
                tw`text-xs`,
                {
                  color: percentageColor,
                  fontFamily: 'Satoshi Variable',
                },
              ]}
            >
              {Math.round(progress)}%
            </Text>
          )}
        </View>
      )}
    </View>
  );
}
