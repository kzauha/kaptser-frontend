import {
    ChatResponse,
    StrategyDetails,
    MiningResults,
    Candle,
    ZigZagPivot,
    Trade,
    EquityPoint,
    PipelineStatus
} from './api-types';

const SIMULATED_DELAY = 1000;

export const mockApi = {
    chat: async (chatId: string, text: string): Promise<ChatResponse> => {
        await new Promise(resolve => setTimeout(resolve, SIMULATED_DELAY));

        const lowerText = text.toLowerCase();

        if (lowerText.includes('mine') || lowerText.includes('strategy') || lowerText.includes('btc')) {
            return {
                message: "✅ **Mining Started!**\n\n**Symbol:** BTC/USDT\n**Timeframe:** 4h\n**Run ID:** `mock-run-uuid`",
                strategy_id: 1,
                action: 'RUN_STRATEGY'
            };
        } else if (lowerText.includes('hello') || lowerText.includes('hi')) {
            return {
                message: "Hello! I can help you mine strategies. Try saying 'Mine BTC/USDT strategy'.",
                strategy_id: null,
                action: 'NONE'
            };
        }

        return {
            message: "I'm meant to demonstrate the mining pipeline. Please ask to run a strategy.",
            strategy_id: null,
            action: 'CLARIFY'
        };
    },

    getPipelineStatus: async (strategyId: number): Promise<PipelineStatus> => {
        // In a real app, this would change over time. 
        // For the mock, we can return a random progress state or always simulated completed
        // Let's rely on the caller to manage "simulated time" if needed, 
        // or just return a static specific state for now.

        return {
            strategy_id: strategyId,
            pipeline_run_id: "mock-run-uuid",
            status: 'COMPLETED',
            current_step: null,
            steps: [
                { name: "raw_crypto_ohlcv", status: "COMPLETED" },
                { name: "features_matrix", status: "COMPLETED" },
                { name: "zigzag_pivots", status: "COMPLETED" },
                { name: "qualified_moves", status: "COMPLETED" },
                { name: "training_dataset", status: "COMPLETED" },
                { name: "entry_rules", status: "COMPLETED" },
                { name: "backtest_results", status: "COMPLETED" }
            ],
            progress: 100,
            started_at: new Date().toISOString()
        };
    },

    getResults: async (strategyId: number): Promise<MiningResults> => {
        return {
            summary: {
                total_trades: 195,
                win_rate: 0.3846,
                avg_trade_return: 0.00433,
                net_profit: -1416.51,
                final_capital: 8583.49,
                profit_factor: 1.12,
                max_drawdown: -0.15
            },
            baselines: {
                strategy: { avg_return: 0.209, win_rate: 0.385 },
                random_baseline: { avg_return: 0.019, win_rate: 0.335 },
                market_baseline: { avg_return: 1.758 },
                edge: { vs_random: 0.19 }
            },
            rules: [
                {
                    rule_id: "Node_6",
                    condition_human: "Lower_Shadow_Pct > 0.2972 AND RSI_14 > 34.7259",
                    condition_python: "Lower_Shadow_Pct > 0.2972 & RSI_14 > 34.7259",
                    metrics: {
                        train_precision: 0.913,
                        test_precision: 0.714,
                        train_recall: 0.583,
                        train_support: 23,
                        test_support: 7,
                        overfit_ratio: 1.28
                    }
                }
            ],
            feature_importances: {
                "RSI_14": 0.336,
                "Lower_Shadow_Pct": 0.664
            },
            yearly_performance: {
                "2020": 15.77, "2021": 19.33, "2022": -11.39, "2023": 0.69
            },
            best_rules: []
        };
    },

    getCandles: async (strategyId: number): Promise<{ symbol: string; timeframe: string; candles: Candle[] }> => {
        // Generate mock candles
        const candles: Candle[] = [];
        let price = 30000;
        let time = Math.floor(new Date('2023-01-01').getTime() / 1000);

        for (let i = 0; i < 500; i++) {
            time += 4 * 3600; // 4h
            const change = (Math.random() - 0.5) * 500;
            price += change;
            const volatility = Math.random() * 200;

            candles.push({
                time,
                open: price,
                high: price + volatility,
                low: price - volatility,
                close: price + (Math.random() - 0.5) * volatility
            });
        }

        return {
            symbol: "BTC/USDT",
            timeframe: "4h",
            candles
        };
    },

    getZigZag: async (strategyId: number): Promise<{ deviation_pct: number; pivots: ZigZagPivot[] }> => {
        // Mock pivots matching the structure, just empty or simple for now
        return {
            deviation_pct: 8.0,
            pivots: []
        };
    }
};
