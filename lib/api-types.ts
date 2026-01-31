export interface HealthCheckResponse {
    status: string;
    system: string;
}

export interface ChatResponse {
    message: string;
    strategy_id: number | null;
    action: 'RUN_STRATEGY' | 'CLARIFY' | 'NONE';
}

export interface StrategyDetails {
    id: number;
    name: string;
    symbol: string;
    timeframe: string;
    status: 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED';
    pipeline_run_id: string;
    created_at: string;
    completed_at?: string;
    config: any;
}

export interface MiningResults {
    summary: {
        total_trades: number;
        win_rate: number;
        avg_trade_return: number;
        net_profit: number;
        final_capital: number;
        profit_factor: number;
        max_drawdown: number;
    };
    baselines: {
        strategy: { avg_return: number; win_rate: number };
        random_baseline: { avg_return: number; win_rate: number };
        market_baseline: { avg_return: number };
        edge: { vs_random: number };
    };
    rules: Array<{
        rule_id: string;
        condition_human: string;
        condition_python: string;
        metrics: any;
    }>;
    feature_importances: Record<string, number>;
    yearly_performance: Record<string, number>;
    best_rules: Array<any>;
}

export interface Candle {
    time: number; // Unix seconds
    open: number;
    high: number;
    low: number;
    close: number;
}

export interface ZigZagPivot {
    time: number;
    price: number;
    type: 'HIGH' | 'LOW';
}

export interface Trade {
    trade_id: number;
    rule_id: string;
    entry_time: number;
    entry_price: number;
    exit_time: number;
    exit_price: number;
    return_pct: number;
    duration_bars: number;
    exit_reason: 'TP' | 'SL' | 'TIME';
}

export interface EquityPoint {
    time: number;
    equity: number;
    drawdown_pct: number;
}

export interface PipelineStep {
    name: string;
    status: 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED' | 'SKIPPED';
}

export interface PipelineStatus {
    strategy_id: number;
    pipeline_run_id: string;
    status: 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED';
    current_step: string | null;
    steps: PipelineStep[];
    progress: number;
    started_at: string;
    completed_at?: string;
    failed_at?: string;
    elapsed_seconds?: number;
    error?: string;
}
