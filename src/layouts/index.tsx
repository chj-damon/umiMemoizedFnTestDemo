import { Link, Outlet } from 'umi';
import styles from './index.less';

export default function Layout() {
  return (
    <div className={styles.navs}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/docs">Docs</Link>
        </li>
        <li>
          <Link to="/class">Class放state里</Link>
        </li>
        <li>
          <Link to="/memo">测试useMemo大小写</Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
}
